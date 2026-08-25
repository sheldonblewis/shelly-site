import PageMeta from '@/components/PageMeta'
import BackLink from '@/components/BackLink'

export default function StateMachines() {
  return (
    <>
      <PageMeta title="can we create abundance using state machines" />

      <BackLink scrollTarget="thoughts">thoughts</BackLink>

      <article className="section">
        <div className="thought-date" style={{ marginBottom: '0.5rem' }}>aug 25, 2026</div>
        <h1 style={{ marginBottom: '2rem' }}>can we create abundance using state machines</h1>

        <div className="prose">
          <ul>
            <li>
              thesis is abundance will be created by our ability to achieve exponential growth in physical industries using ai (manufacturing, energy, supply chain, etc.).
            </li>
            <li>
              physical industries&apos; growth, towards whatever metric (throughput, revenue, profit, etc.), comes from their decisions. decisions, functionally, are where they choose to allocate their assets. example: a manufacturing company&apos;s transition from window panes to bottles involves investing time to train employees, repurpose equipment, change clientele, etc. all of which can be quantified.
            </li>
            <li>
              models, in theory, can view a larger decision space—they are just missing a way to model an allocation of assets, or a state, as verifiable ground truths. past that, continuously improving models are, and will be, able to infer its decision space and attached outcomes.
            </li>
            <li>
              thus, we reach the state machine. my thesis on how to give models the potential to drastically increase margins, and achieve abundance in physical industries through optimization.
            </li>
          </ul>

          <p>next i will be:</p>
          <ol>
            <li>finding the best way to embed this context shape.</li>
            <li>post-training a model to understand it.</li>
            <li>learning how to evaluate and deploy it.</li>
          </ol>
        </div>
      </article>
    </>
  )
}
