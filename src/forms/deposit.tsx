import { useForm } from '@tanstack/react-form'
import z from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter'
import Icon from '@mdi/react';
import { mdiClockTimeEightOutline, mdiCurrencyRupee, mdiPercent } from '@mdi/js';
import { useEffect, useState } from 'react';
import { calculateInterestOnDeposit, MonthlySummary, YearlySummary } from '../lib/calculate';
import { FieldInfo } from '../lib/helpers';


type Data = {
    rate: number,
    time: number,
    principal: number
    interest: number
    summaryData: {
        monthly: MonthlySummary[],
        yearly: YearlySummary[]
    }
}

interface Props {
    monthlySummaries: MonthlySummary[];
    yearlySummaries: YearlySummary[];
}

const InterestTable: React.FC<Props> = ({ monthlySummaries, yearlySummaries }) => {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        // Code to run when activeTab changes
    }, [activeTab]);

    const handleTabClick = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };

    return (
        <div>
            <div className="tabs">
                <a className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>Monthly Breakdown</a>
                <a className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>Yearly Breakdown</a>
            </div>
            <div className={`page padding right ${activeTab === 1 ? 'active' : ''}`}>
                <table className="text-xs stripes md:text-xl">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Interest</th>
                            <th>Accrued Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlySummaries.map(summary => (
                            <tr key={summary.month}>
                                <td>{summary.month}</td>
                                <td>₹{summary.interest.toFixed(2)}</td>
                                <td>₹{summary.accruedInterest.toFixed(2)}</td>
                                <td>₹{summary.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={`page padding left ${activeTab === 2 ? 'active' : ''}`}>
                <table className="stripes">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Interest</th>
                            <th>Accrued Interest</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {yearlySummaries.map(summary => (
                            <tr key={summary.year}>
                                <td>{summary.year}</td>
                                <td>₹{summary.interest.toFixed(2)}</td>
                                <td>₹{summary.accruedInterest.toFixed(2)}</td>
                                <td>₹{summary.balance.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default function DepositForm() {
    const [result, setResult] = useState<Data>();

    const form = useForm({
        defaultValues: {
            principal: 0,
            rate: 0,
            years: 0
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            const data = calculateInterestOnDeposit(value.principal, value.rate, value.years)
            console.log(data)
            setResult({
                principal: value.principal,
                rate: value.rate,
                time: value.years,
                interest: data.yearly[data.yearly.length - 1].interest,
                summaryData: data
            })
        },
        validatorAdapter: zodValidator,
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div>
                <form.Field
                    name="principal"
                    validators={{
                        onChange: z
                            .number()
                            .min(3, 'Principal must be at least 3'),
                        onChangeAsyncDebounceMs: 500,
                    }}
                    children={(field) => (
                        <div className='fill field label suffix round'>
                            <input
                                type='number'
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                            />
                            <label>Principal</label>
                            <Icon path={mdiCurrencyRupee} />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
                <form.Field
                    name="rate"
                    validators={{
                        onChange: z
                            .number()
                            .min(2, 'Rate must be at least 2'),
                        onChangeAsyncDebounceMs: 500,
                    }}
                    children={(field) => (
                        <div className='fill field label suffix round'>
                            <input
                                type='number'
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                            />
                            <label>Rate</label>
                            <Icon path={mdiPercent} />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
                <form.Field
                    name="years"
                    validators={{
                        onChange: z
                            .number()
                            .min(1, 'Time in years must be at least 1'),
                        onChangeAsyncDebounceMs: 500,
                    }}
                    children={(field) => (
                        <div className='fill field label suffix round'>
                            <input
                                type='number'
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                            />
                            <label>Time (years)</label>
                            <Icon path={mdiClockTimeEightOutline} />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
            </div>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? '...' : 'Submit'}
                    </button>
                )}
            />
            {result && <div className="flex flex-col justify-center p-5 mt-4 primary rounded-xl">
                <h5>
                    <Icon path={mdiCurrencyRupee} size={3} />
                    <p className='text-5xl'>{result.principal + result.interest}</p>
                </h5>
                <div>for a principal of {result.principal} with a rate of {result.rate}% over {result.time} years</div>
            </div>}

            {result && <InterestTable monthlySummaries={result.summaryData.monthly} yearlySummaries={result.summaryData.yearly} />}
        </form>
    )
}