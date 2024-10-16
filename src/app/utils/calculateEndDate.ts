

export default function calculateEndDate(plan:string,startDate:Date) {
    const date = new Date(startDate); 

    // Add months to the start date based on the subscription plan
    switch (plan) {
      case '1 month':
              date.setMonth(date.getMonth() + 1); 
        break;
      case '6 months':
        date.setMonth(date.getMonth() + 6); 
        break;
      case '1 year':
        date.setFullYear(date.getFullYear() + 1); 
        
      default:
        throw new Error('Invalid subscription plan');
    }
  
    return date; // Return the calculated endDate
  }
