'use client';

import { Input } from '@/components/ui/input';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import {
  DYNAMIC_TEXT_SEQUENCE,
  POPULAR_SEARCHED,
  STATS,
} from '../utils/constants';
import FullScreenLoader from '@/src/common/components/FullScreenLoader';

export default function HeroSection() {
  return (
    <section className="bg-blue-50/60 py-16">
      <div className="max-w-6xl mx-auto ">
        <div className="grid grid-cols-2 gap-x-4 justify-between">
          <div className="space-y-6 w-full">
            <h1 className="text-gray-900 text-5xl font-extrabold">
              India&apos;s No. 1 Platform <br /> for{' '}
              <TypeAnimation
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500"
                sequence={DYNAMIC_TEXT_SEQUENCE}
                speed={{
                  type: 'keyStrokeDelayInMs',
                  value: 100,
                }}
                repeat={Infinity}
              />
            </h1>

            <div className="py-4">
              <div>
                <Input
                  className="rounded-full max-w-lg px-6 py-6"
                  placeholder="Search for the service"
                />
              </div>

              <h4 className="text-gray-600 font-semibold mt-4 mb-2">
                <TrendingUp className="inline mr-2" /> Popular searches
              </h4>
              <ul className="flex flex-wrap gap-x-4">
                {POPULAR_SEARCHED.map((item, index) => (
                  <button
                    key={index}
                    className="bg-white border-[1px] font-medium hover:text-primary hover:border-primary p-2 text-sm rounded-sm"
                  >
                    {item}
                  </button>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Image
              src="/img/hero-image.png"
              alt="hero image"
              width={580}
              height={380}
            />
          </div>
        </div>

        {/* Stats */}

        <div className='flex justify-between items-center mt-16'>
          {STATS.map((Item, index) => (
            <div className='flex gap-x-2' key={index}>
              <Item.icon className="fill-primary" size={44}/>
              <div>
                <h1 className="font-extrabold text-gray-800 text-xl">{Item.title}</h1>
                <p className="text-gray-600">{Item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
