import Image from "next/image";

const WorkInProgress = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-xl lg:text-2xl">
        Page en construction
      </h1>
      <Image
        alt="Panneau de chantier"
        src="/images/chantier.png"
        width={350}
        height={328}
      />
    </div>
  );
};

export default WorkInProgress;
