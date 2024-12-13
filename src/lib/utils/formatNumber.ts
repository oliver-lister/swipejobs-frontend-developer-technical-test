export const formatNumber = (phone: string): string => {
  const onlyDigits = phone.replace(/\D/g, "");
  const formattedNumber = onlyDigits.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "($1) $2 $3"
  );
  return formattedNumber;
};
