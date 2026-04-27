import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SecurityCard from "@/components/ui/SecurityCard";

const levels = [
  {
    title: "Safe (Aman)",
    color: "text-safe",
    description: "Tidak ada interaksi signifikan. Makanan ini aman dikonsumsi bersamaan dengan obat yang sedang aktif."
  },
  {
    title: "Caution (Hati-hati)",
    color: "text-warning",
    description: "Perlu penyesuaian porsi atau pengaturan jarak waktu konsumsi. Sebaiknya konsultasi jika ragu."
  },
  {
    title: "Danger (Bahaya)",
    color: "text-danger",
    description: "Risiko tinggi interaksi serius. Pasien dilarang mengonsumsi makanan ini, dan peringatan akan dikirim ke perawat."
  }
];

export default function SecurityLevels() {
  return (
    <Section id="keamanan" className="relative z-10 bg-surface" aria-labelledby="stack-title">
      <SectionHeader
        id="stack-title"
        title="Tingkat"
        subtitle="Keamanan"
        description="Klasifikasi interaksi makanan dan obat yang konsisten untuk meminimalisir risiko medis dan efek samping."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-x-[50px] lg:gap-y-[58px]">
        {levels.map((level) => (
          <SecurityCard
            key={level.title}
            {...level}
          />
        ))}
      </div>
    </Section>
  );
}

