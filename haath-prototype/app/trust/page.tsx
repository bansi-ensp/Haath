import { TopBar } from "@/components/TopBar";

export default function TrustPage() {
  return (
    <>
      <TopBar back="/" title="How verification works" />
      <main className="screen prose">
        <h1 className="h1">What Haath checks</h1>
        <p>
          Every detail on a Passport is marked. Some are checked by the Haath team. The rest are in the worker&rsquo;s
          own words.
        </p>

        <h2 className="h2">What each label means</h2>
        <dl className="meanings">
          <div>
            <dt><span className="label label-seal label-static">ID verified</span></dt>
            <dd>A Haath team member checked a government ID and confirmed it belongs to this person. Haath keeps only the date and who checked it, never a copy of the ID.</dd>
          </div>
          <div>
            <dt><span className="label label-seal label-static">Reference verified</span></dt>
            <dd>Haath called a past employer, who confirmed the person worked for them.</dd>
          </div>
          <div>
            <dt><span className="label label-self label-static">Self-reported</span></dt>
            <dd>Written by the worker. Haath has not checked it.</dd>
          </div>
          <div>
            <dt><span className="label label-seal label-static">Verified employer</span></dt>
            <dd>Employers go through the same ID check, so workers can see who is asking before they accept.</dd>
          </div>
        </dl>

        <h2 className="h2">What a label does not mean</h2>
        <p>
          A verified label tells you an identity or a past job was checked. It does not guarantee anyone&rsquo;s work or
          behaviour. Haath connects people; it does not employ or insure them.
        </p>

        <h2 className="h2">How contact works</h2>
        <p>
          Neither side&rsquo;s number is visible until the worker accepts a request. Only the worker can accept, by their own
          tap, keypress or reply. Either side can block or report the other at any time.
        </p>

        <h2 className="h2">If something goes wrong</h2>
        <p>
          Reports are reviewed by a person. Before any decision, both sides are asked for their account. An accusation is
          never published on a Passport.
        </p>
      </main>
    </>
  );
}
