export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/thoughts/state-machines',
      permanent: true,
    },
  }
}

export default function StateMachinesRedirect() {
  return null
}
