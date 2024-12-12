export const formatNumber = (phone: string): string => {
  const formattedNumber = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3");
  return formattedNumber;
};
