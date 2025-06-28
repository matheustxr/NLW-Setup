import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import dayjs from 'dayjs';
import { HabitsList } from './HabitList';
import { useState, useEffect } from 'react';

interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  useEffect(() => {
    setCompleted(defaultCompleted);
  }, [defaultCompleted]);

  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="relative w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background group">
        <div
          className="absolute inset-0 rounded-full p-[2px] bg-[conic-gradient(var(--progress-color)_0%,transparent_0%)] transition-all duration-500"
          style={{
            '--progress-color': '#7c3aed',
            backgroundImage: `conic-gradient(#7c3aed ${completedPercentage}%, transparent ${completedPercentage}%)`,
          } as React.CSSProperties}
        >
          <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center">
            <span className="text-sm text-white font-bold">
              {dayjs(date).format('D')}
            </span>
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />

          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
