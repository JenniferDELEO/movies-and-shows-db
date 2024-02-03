const WorkInProgress = () => {
  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-xl lg:text-2xl">
        Page en construction
      </h1>
      <picture>
        <img
          alt="Panneau de chantier"
          src="/images/chantier.png"
          width={350}
          height={328}
        />
      </picture>
    </div>
  );
};

export default WorkInProgress;
