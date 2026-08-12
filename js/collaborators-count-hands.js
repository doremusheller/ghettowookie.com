(()=>{const $=id=>document.getElementById(id);const isCount=name=>/^count[-_ ]*the[-_ ]*hands/i.test((name||'').replace(/\.[^.]+$/,''));function render(){if(!isCount(window.activeApprovalTrackName))return;const title=$('displayTitle'),lead=$('displayLead'),prompt=$('displayPrompt'),lyrics=$('displayLyrics'),display=$('songDisplay');if(!title||!lead||!prompt||!lyrics||!display)return;title.textContent='Count the Hands';lead.textContent='Drumma Kaan';prompt.textContent='Dark, sexy minimalist funk-pop, ~115 BPM. Hypnotic, tense, danceable. Dry punchy drums dominate: deep kick, sharp snare, tight hats, impossibly deep four-limb pocket—subtle, never busy. Lean didgeridoo and elastic bass locked to drums; sparse guitar/synth accents, lots of space. Low warm male lead, cool and intimate; razor-short phrasing, breathy exhales and restrained grunts as rhythmic punctuation. Female backing chorus only; boy never speaks—drums only. Deadpan tension. Pocket over complexity.';lyrics.textContent=`[Intro — dry drum groove]

[Verse 1 — Drumma]
She came by Tuesday
Boy by her side
Said he was mine
Woman, you lie

Same dark eyes
Same crooked grin
Same little locks
Under his chin

Hnh.
Means nothing

Same long arms
Same heavy feet
Starts tapping rhythms
Whenever he eats

Hah.
Kids do that

[Chorus — Drumma / women backing]
That boy ain't mine
(Ain't he?)
That's what I said
(Mmm-hmm)
That boy ain't mine
(Ain't he?)
Get that out your head

That boy ain't mine
Girl, let it be
(Ooh, Kaan...)
Don't put
That child
On me

[Verse 2 — Drumma]
Sleeps till noon
So do I
Hates dress shoes
Can't blame the guy

Won't sit still
Won't stay clean
Mean little temper
Know what I mean

Hnh.
Could be anybody

She says he hums
Low in his chest
Keeps his own time
While everybody rests

He heard my record
Just one time
Played the whole pocket
Back in his mind

...
Lucky guess

[Chorus — Drumma / women backing]
That boy ain't mine
(Ain't he?)
Don't start that mess
(Mmm-hmm)
That boy ain't mine
(Ain't he?)
You're making a guess

That boy ain't mine
Can't prove a thing
(Ooh, Kaan...)
Same face
Same walk
Don't mean anything

[Verse 3 — Drumma]
She kept on smiling
That bothered me
Too damn calm
For somebody wrong

Same eyes don't
Make him mine
Same hair, same walk
You're wasting your time

Hnh.
I said, “You got nothing.
Let the whole thing drop.”

She looked at the boy
Then looked at my kit
Slid him the sticks
Said—
“Go ahead, son.”

[DRUM BREAK]
[Small kit starts a simple pocket]

Okay.
Kid got time.

[Second rhythm enters]
Wait.

[Third enters]
Hold up.

[Fourth enters]
...
Nah.

[Groove gets nasty]
No.
No, no, no.

[Drumma's kit answers]
Don't do that.

[Boy answers on drums]
Don't you do that.

[Drumma throws a vicious four-limb fill]
[Boy throws it back]

...
Shit.

[Both kits lock into the same impossible groove]

[Final Chorus — Drumma / women]
That boy ain't mine
(Ain't he?)
That boy ain't mine
(Mmm-hmm)

[Boy drum fill]
Stop that.

That boy ain't mine
Can't prove a—
[Boy answers]
Boy.

That boy ain't—
[Another fill]
I said quit.

Same eyes don't prove it
Same hair don't prove it
Same walk don't prove it

[Four sticks click]
...
Drums ain't proof.

(Mmm-hmm.)

[Massive child drum fill]
Goddammit.

[Beat]
Nobody said the boy can't play.

[Final snare. CUT.]`;display.hidden=false}document.addEventListener('click',e=>{const row=e.target.closest('.tracks-mode .song-row');if(row&&isCount(row.querySelector('.file-name')?.textContent))setTimeout(render,900)});})();