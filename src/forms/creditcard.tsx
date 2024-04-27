/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@tanstack/react-form'
import z from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter'
import Icon from '@mdi/react';
import { mdiClockTimeEightOutline, mdiCurrencyRupee, mdiPercent } from '@mdi/js';
import { useState } from 'react';
import { calculateInterestOnCreditCard, CreditCardSummary } from '../lib/calculate';
import { FieldInfo } from '../lib/helpers';

type Data = {
    rate: number,
    time: number,
    principal: number
    interest: number,
    summaryData: CreditCardSummary[]
}

export default function CreditCardForm() {
    const [result, setResult] = useState<Data>();

    const form = useForm({
        defaultValues: {
            balance: 0,
            rate: 0,
            months: 0
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            const data = calculateInterestOnCreditCard(value.balance, value.rate, value.months)
            console.log(data)
            setResult({
                principal: value.balance,
                rate: value.rate,
                time: value.months,
                interest: data[data.length - 1].interest,
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
                    name="balance"
                    validators={{
                        onChange: z
                            .number()
                            .min(3, 'Balance must be at least 3'),
                        onChangeAsyncDebounceMs: 500,
                    }}
                    children={(field) => (
                        <div className='field label suffix fill round'>
                            <input
                                type='number'
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                            />
                            <label>Balance</label>
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
                        <div className='field label suffix fill round'>
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
                    name="months"
                    validators={{
                        onChange: z
                            .number()
                            .min(1, 'Time in months must be at least 1'),
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
                            <label>Time (months)</label>
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
        </form>
    )
}