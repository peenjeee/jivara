import api from "@/lib/axios";
import type { PatientRecord, PatientStatus } from "@/lib/mocks/patients";
import type { MedicationScheduleRecord } from "@/lib/mocks/schedules";
import type { PatientDetailData } from "@/helpers/patientDetails";

interface PatientListResponse {
  id: string;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  address?: string | null;
  isActive?: boolean | null;
  createdAt?: string | null;
}

interface PatientDetailResponse extends PatientListResponse {
  registeredAt?: string | null;
  assignedNurse?: { id: string; name: string } | null;
  activeMedications?: Array<{
    id: string;
    drugName: string;
    dosage: string;
    frequency: number;
    scheduledTimes: unknown;
    instructions?: string | null;
    createdAt?: string | null;
  }>;
  activeMedicationsCount?: number;
  adherenceRate7d?: number;
  adherenceRate30d?: number;
  totalFoodScans?: number;
  totalInteractionWarnings?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  meta?: { total?: number };
}

const getAge = (dateOfBirth?: string | null) => {
  if (!dateOfBirth) return 0;
  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed = today.getMonth() > birthDate.getMonth() || today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate();
  if (!hasBirthdayPassed) age -= 1;
  return Math.max(age, 0);
};

const getInitials = (name: string) => name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "PX";

const getStatus = (adherence: number): PatientStatus => {
  if (adherence < 50) return "Need Special Attention";
  if (adherence < 75) return "Lagging Behind";
  return "On Ideal Schedule";
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};

const mapPatient = (patient: PatientListResponse, adherence = 100): PatientRecord => ({
  id: patient.id,
  name: patient.fullName,
  age: getAge(patient.dateOfBirth),
  gender: patient.gender === "female" ? "Wanita" : "Pria",
  phone: patient.phone ?? undefined,
  email: patient.email ?? undefined,
  address: patient.address ?? undefined,
  status: getStatus(adherence),
  lastVisit: formatDate(patient.createdAt),
  adherence,
  avatar: getInitials(patient.fullName),
});

const mapMedication = (patient: PatientRecord, medication: NonNullable<PatientDetailResponse["activeMedications"]>[number]): MedicationScheduleRecord => {
  const times = Array.isArray(medication.scheduledTimes) ? medication.scheduledTimes.filter((time): time is string => typeof time === "string") : [];

  return {
    id: medication.id,
    patientId: patient.id,
    patientName: patient.name,
    patientAvatar: patient.avatar,
    medicineName: medication.drugName,
    dose: medication.dosage,
    medicineForm: "Tablet",
    stock: 0,
    frequency: `${medication.frequency} kali sehari`,
    times,
    mealRule: "Tidak tergantung makan",
    startDate: medication.createdAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
    reminderEnabled: true,
    instructions: medication.instructions ?? undefined,
    status: "Aktif",
  };
};

export const getPatientsFromApi = async () => {
  const response = await api.get<PaginatedResponse<PatientListResponse>>("/patients", { params: { limit: 100, status: "active" } });
  const patients = response.data.data.map((patient) => mapPatient(patient, 100));
  return patients;
};

export const getPatientDetailFromApi = async (patientId: string): Promise<PatientDetailData> => {
  const response = await api.get<{ data: PatientDetailResponse }>(`/patients/${patientId}`);
  const detail = response.data.data;
  const adherence = Math.round(detail.adherenceRate30d ?? detail.adherenceRate7d ?? 100);
  const patient = mapPatient({ ...detail, createdAt: detail.registeredAt ?? detail.createdAt }, adherence);
  const schedules = detail.activeMedications?.map((medication) => mapMedication(patient, medication)) ?? [];

  return {
    patient,
    schedules,
    activities: [],
    scans: [],
  };
};

export const getInitialPatientDetail = (patientId: string): PatientDetailData => {
  return {
    patient: {
      id: patientId,
      name: "-",
      age: 0,
      gender: "Pria",
      status: "On Ideal Schedule",
      lastVisit: "-",
      adherence: 100,
      avatar: "PX",
    },
    schedules: [],
    activities: [],
    scans: [],
  };
};
