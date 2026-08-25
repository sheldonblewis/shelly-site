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
          <p>
            my working thesis is that abundance will be created by our ability to achieve exponential growth in physical industries using ai: manufacturing, energy, supply chain, and the systems around them.
          </p>

          <h2>decisions are allocations</h2>
          <p>
            physical industries grow—whether we measure throughput, revenue, profit, or something else—through the decisions they make. functionally, a decision is an allocation of assets.
          </p>
          <p>
            consider a manufacturing company moving from window panes to bottles. it invests time in training employees, repurposes equipment, changes its customer base, and accepts a different operational profile. each of those choices can be described and quantified.
          </p>

          <h2>the missing state</h2>
          <p>
            models can, in theory, view a larger decision space than any individual operator. what they are missing is a way to model an allocation of assets—or a state—as a set of verifiable ground truths.
          </p>
          <p>
            once that exists, continuously improving models should be able to infer the decision space around a business and the outcomes attached to its possible moves.
          </p>

          <h2>the state machine</h2>
          <p>
            that brings us to the state machine: my thesis for giving models the potential to drastically increase margins, and ultimately help create abundance in physical industries through optimization.
          </p>

          <h2>next</h2>
          <ol>
            <li>find the best way to embed this context shape.</li>
            <li>post-train a model to understand it.</li>
            <li>learn how to evaluate and deploy it.</li>
          </ol>
        </div>
      </article>
    </>
  )
}
