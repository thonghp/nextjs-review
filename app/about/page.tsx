import Heading from '@/components/Heading';
import { Metadata } from 'next';  

export const metadata: Metadata = {
  title: 'About',
};
export default function AboutPage() {
  return (
    <>
      <Heading>About</Heading>
      <p>
        A website created to learn Next.js
      </p>
    </>
  );
}
