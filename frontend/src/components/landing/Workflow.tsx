import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import WorkflowCard from "@/components/ui/WorkflowCard";

const steps = [
  {
    number: 1,
    title: "Registrasi",
    description: "Perawat mendaftarkan pasien dan jadwal obat secara terpusat melalui dashboard administratif yang aman.",
    span: "lg:col-span-7"
  },
  {
    number: 2,
    title: "Pengingat Cerdas",
    description: "Pasien menerima notifikasi pengingat berulang untuk konsumsi obat dan cek interaksi makanan.",
    span: "lg:col-span-5"
  },
  {
    number: 3,
    title: "Scan Makanan",
    description: "Kamera mendeteksi jenis makanan dan langsung mencocokkan interaksinya dengan obat pasien.",
    span: "lg:col-span-6",
    label: "Scan"
  },
  {
    number: 4,
    title: "Monitoring",
    description: "Sistem memberikan alert 'Danger' atau 'Caution' ke perawat jika pasien mencoba mengonsumsi makanan yang berisiko.",
    span: "lg:col-span-6"
  }
];

export default function Workflow() {
  return (
    <Section id="alur" className="relative z-10 bg-bg" aria-labelledby="projects-title">
      <SectionHeader
        id="projects-title"
        title="Alur"
        subtitle="Sistem"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-stretch gap-6 md:gap-[30px]">
        {steps.map((step) => (
          <WorkflowCard
            key={step.number}
            {...step}
          />
        ))}
      </div>
    </Section>
  );
}

