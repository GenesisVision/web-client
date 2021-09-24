const useDevelopmentFeature = (isAvailableProd?: boolean) => {
  const isAvailableFeature = !!(
    process.env.NODE_ENV === "development" || isAvailableProd
  );

  return { isAvailableFeature };
};

export default useDevelopmentFeature;
