export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/thoughts/veena',
      permanent: true,
    },
  }
}

export default function VeenaRedirect() {
  return null
}
