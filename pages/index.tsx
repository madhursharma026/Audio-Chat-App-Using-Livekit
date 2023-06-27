import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import styles from '../styles/Home.module.css';


function DemoMeetingTab({ label }: { label: string }) {
  const router = useRouter();
  const startMeeting = () => {
    router.push(`/rooms/${generateRoomId()}`);
  };
  return (
    <div className={styles.tabContent}>
      <p style={{ marginTop: 0 }}>We Are Trying LiveKit Meet with our live demo project.</p>
      <button className="lk-button" onClick={startMeeting}>
        Start Meeting
      </button>
    </div>
  );
}


export const getServerSideProps: GetServerSideProps<{ tabIndex: number }> = async ({
  query,
  res,
}) => {
  res.setHeader('Cache-Control', 'public, max-age=7200');
  const tabIndex = query.tab === 'custom' ? 1 : 0;
  return { props: { tabIndex } };
};

const Home = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  function onTabSelected(index: number) {
    const tab = index === 1 ? 'custom' : 'demo';
    router.push({ query: { tab } });
  }
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          <img src="/images/livekit-meet-home.svg" alt="LiveKit Meet" width="360" height="45" />
        </div>
        <DemoMeetingTab label="Demo" />
      </main>
    </>
  );
};

export default Home;

function generateRoomId(): string {
  return `${randomString(4)}-${randomString(4)}`;
}

function randomString(length: number): string {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
