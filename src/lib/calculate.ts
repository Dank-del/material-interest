interface MonthlySummary {
    month: number;
    interest: number;
    accruedInterest: number;
    balance: number;
}

interface YearlySummary {
    year: number;
    interest: number;
    accruedInterest: number;
    balance: number;
}

interface CreditCardSummary {
    month: number;
    balance: number;
    interest: number;
    totalBalance: number;
}

/**
 * Calculates the monthly credit card summaries based on the given balance, interest rate, and number of months.
 * @param balance The initial balance on the credit card.
 * @param rate The annual interest rate on the credit card.
 * @param months The number of months to calculate the summaries for.
 * @returns An array of CreditCardSummary objects representing the monthly summaries.
 */
function calculateInterestOnCreditCard(balance: number, rate: number, months: number): CreditCardSummary[] {
    const monthlyInterestRate = rate / 12 / 100;
    const monthlySummaries: CreditCardSummary[] = [];

    for (let month = 0; month <= months; month++) {
        const interest = balance * monthlyInterestRate;
        const totalBalance = balance + interest;

        const summary: CreditCardSummary = {
            month: month,
            balance: parseFloat(balance.toFixed(2)),
            interest: parseFloat(interest.toFixed(2)),
            totalBalance: parseFloat(totalBalance.toFixed(2))
        };

        monthlySummaries.push(summary);

        balance = totalBalance; // Update balance for next month
    }

    return monthlySummaries;
}


/**
 * Calculates the interest on a deposit over a given period of time.
 * @param principal - The initial amount of the deposit.
 * @param rate - The annual interest rate as a percentage.
 * @param time - The number of years the deposit is held for.
 * @returns An object containing monthly and yearly summaries of the deposit.
 */
function calculateInterestOnDeposit(principal: number, rate: number, time: number): { monthly: MonthlySummary[], yearly: YearlySummary[] } {
    const monthlyInterestRate = rate / (12 * 100);
    const totalMonths = time * 12;

    const monthlySummaries: MonthlySummary[] = [];
    const yearlySummaries: YearlySummary[] = [];

    let balance = principal;

    for (let month = 0; month <= totalMonths; month++) {
        const interest = balance * monthlyInterestRate;
        const accruedInterest = balance + interest - principal;
        balance += interest;

        const monthlySummary: MonthlySummary = {
            month: month,
            interest: parseFloat(interest.toFixed(2)),
            accruedInterest: parseFloat(accruedInterest.toFixed(2)),
            balance: parseFloat(balance.toFixed(2))
        };
        monthlySummaries.push(monthlySummary);

        if (month % 12 === 0) {
            const year = month / 12;
            const yearlyInterest = balance - principal;
            const yearlyAccruedInterest = principal + yearlyInterest;
            const yearlySummary: YearlySummary = {
                year: year,
                interest: parseFloat(yearlyInterest.toFixed(2)),
                accruedInterest: parseFloat(yearlyAccruedInterest.toFixed(2)),
                balance: parseFloat(balance.toFixed(2))
            };
            yearlySummaries.push(yearlySummary);
        }
    }

    return { monthly: monthlySummaries, yearly: yearlySummaries };
}

export { calculateInterestOnDeposit, calculateInterestOnCreditCard };
export type { MonthlySummary, YearlySummary, CreditCardSummary };

