const useDevelopmentFeature = (isAvailableProd?: boolean) => {
  const isAvailableFeature = !!(
    process.env.NODE_ENV !== "production" || isAvailableProd
  );

  return { isAvailableFeature };
};

export default useDevelopmentFeature;
