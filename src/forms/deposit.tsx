/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from '@tanstack/react-form'
import z from 'zod';
import { zodValidator } from '@tanstack/zod-form-adapter'
import type { FieldApi } from '@tanstack/react-form'
import Icon from '@mdi/react';
import { mdiClockTimeEightOutline, mdiCurrencyRupee, mdiPercent } from '@mdi/js';
import { useState } from 'react';

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

type Data = {
    rate: number,
    time: number,
    principal: number
    interest: number
}

export default function DepositForm() {
   const [result, setResult] = useState<Data>();
    function calculateInterestOnDeposit(principal: number, rate: number, time: number): number {
        const interest = (principal * rate * time) / 100;
        return interest;
    }

    const form = useForm({
        defaultValues: {
            principal: 0,
            rate: 0,
            years: 0
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            const interest = calculateInterestOnDeposit(value.principal, value.rate, value.years)
            console.log(interest + value.principal)
            setResult({
                principal: value.principal,
                rate: value.rate,
                time: value.years,
                interest: interest
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
                        <div className='field label suffix border round'>
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
                        <div className='field label suffix border round'>
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
                        <div className='field label suffix border round'>
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
            {result && <div className="mt-4 p-5 primary flex justify-center flex-col rounded-xl">
                <h5>
                <Icon path={mdiCurrencyRupee} size={3} />
                <p className='text-5xl'>{result.principal + result.interest}</p>
                </h5>
                <div>for a principal of {result.principal} with a rate of {result.rate}% over {result.time} years</div>
            </div>}
        </form>
    )
}