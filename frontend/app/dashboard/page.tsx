// app/dashboard/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/login');
  //   }
  // }, [status]);

  if (status === 'loading') return <p>Loading...</p>;

  return <div>Welcome to your dashboard, {session?.user?.name}</div>;
};

export default Dashboard;
