import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Section from "@/components/ui/Section";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <Section className="min-h-[70vh] pt-32 lg:pt-48 pb-20">
        <div className="max-w-[800px]">
          <h1 className="font-display text-xl lg:text-2xl font-extrabold uppercase mb-12 tracking-tight text-dark">
            Kebijakan Privasi
          </h1>
        </div>
      </Section>
      <Footer />
    </>
  );
}

