import api from "@/lib/axios";
import type { ActivityLogRecord } from "@/lib/mocks/activityLogs";

interface AlertResponse {
  id: string;
  patientId: string;
  patientName: string;
  scheduleId: string;
  drugName: string;
  dosage: string;
  scheduledTime: string;
  status: string;
  severity: "warning" | "critical";
  message: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}

interface PaginatedResponse<T> {
  data: T[];
}

export const getAlertActivitiesFromApi = async (): Promise<ActivityLogRecord[]> => {
  const response = await api.get<PaginatedResponse<AlertResponse>>("/alerts", { params: { limit: 100 } });

  return response.data.data.map((alert) => ({
    id: alert.id,
    title: alert.severity === "critical" ? "Kepatuhan kritis" : "Peringatan kepatuhan",
    description: alert.message,
    category: "Kepatuhan",
    severity: alert.severity === "critical" ? "Kritis" : "Peringatan",
    timestamp: alert.updatedAt || alert.createdAt || alert.scheduledTime,
    patientId: alert.patientId,
    patientName: alert.patientName,
    scheduleId: alert.scheduleId,
    medicineName: `${alert.drugName} ${alert.dosage}`,
    read: false,
  }));
};

export const resolveAlertViaApi = async (alertId: string) => {
  await api.patch(`/alerts/${encodeURIComponent(alertId)}/resolve`);
};
