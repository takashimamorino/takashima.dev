import { type VFC } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

const HATCHING_CHICK_ICON_URL =
  'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/hatching-chick_1f423.png';

export const Header: VFC = () => {
  return (
    <header>
      <div className="flex">
        <Link href="/">
          <a className="flex">
            <div className="flex items-center">
              <NextImage
                src={HATCHING_CHICK_ICON_URL}
                alt="emoji hatching chick"
                width={24}
                height={24}
              />
            </div>
            <div className="ml-1">
              <span className="text-xl font-medium tracking-wide">takashima.dev</span>
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
};
