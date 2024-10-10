'use client';
import { RefObject, useEffect, useRef, useState } from 'react';

export default function Home() {
  let ref = useRef<HTMLDivElement>(null);
  let [overflowCount, setOverflowCount] = useState(0);

  useOnResize(ref, (entry) => {
    let offsets = Array.from(entry.target.children).map((el) =>
      el instanceof HTMLElement ? el.offsetTop : 0
    );
    let firstNumber = offsets[0];
    let count = offsets.findIndex((num) => num !== firstNumber);
    let result = count === -1 ? offsets.length : count;

    setOverflowCount(offsets.length - result);
  });

  return (
    <div className="mx-auto mt-8">
      <div className="flex items-center px-4">
        <div ref={ref} className="flex h-8 overflow-hidden gap-4 flex-wrap">
          {Array.from(Array(20).keys()).map((i) => (
            <div key={i} className="size-8 bg-green-500" />
          ))}
        </div>

        <div className="whitespace-nowrap pl-2">+ {overflowCount}</div>
      </div>

      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          consequuntur debitis est eligendi neque iure quis tenetur corrupti et?
          Molestias ullam quis enim dolore nisi praesentium doloremque nobis
          numquam laborum!
        </p>
      </div>
    </div>
  );
}

function useOnResize<T extends Element>(
  ref: RefObject<T>,
  callback: (entry: ResizeObserverEntry) => void
) {
  useEffect(() => {
    let el = ref.current;
    if (!el) return;

    let observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        callback(entry);
      }
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}
