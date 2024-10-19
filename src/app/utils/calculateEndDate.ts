

export default function calculateEndDate(plan: string, startDate: Date) {
  const date = new Date(startDate);

  // Add months to the start date based on the subscription plan
  if (plan === '1 Month') {
    date.setMonth(date.getMonth() + 1);
  } else if (plan === '6 Months') {
    date.setMonth(date.getMonth() + 6);
  } else if (plan === '1 Year') {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    throw new Error('Invalid subscription plan');
  }

  return date;
}
