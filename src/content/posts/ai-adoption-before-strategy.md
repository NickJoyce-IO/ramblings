---
title: "My team adopted AI before I had a plan for it"
description: "I surveyed my engineering and data team about how they use AI, expecting to find a few early adopters. Turns out adoption was already done, and the leadership job looks different from the one I expected."
date: 2026-10-05
kind: essay
checklist: passed
---

Earlier this year I wanted to understand how my team are using AI. I was expecting to find it was mostly experimental, and that we had time to define how AI was going to be used to complement our workflows. That's not what came back.
I found that about three-quarters of the team use it every day, and nearly everyone uses it at
least once a week. The adoption plan I'd been thinking about was already finished. The team had just got on with it.

This fundamentally changed the objective. There's no point encouraging people to
use something they already use every day. What matters now is making sure
they've got the skills and access to use it well, and that we decide how we want to work
with it on purpose, before everyone settles into whatever habits they happened
to pick up along the way.

This isn't one of the two follow-ups I promised at the end of my last post, on
branching off mid-task and on whether review holds up as agents write more of
the code. Those are still coming. This one is about something running in
parallel: what my own team is doing with AI, alongside what I've been testing
myself on this blog.

## It happened without us

For context, I lead a team of around twenty people across software engineering
and data. This was the first time a survey had been run, so there's no trend, this was just a
snapshot of where things are.

The survey showed that people were not just dabbling. The two biggest uses were debugging (around 80%)
and code review (around three-quarters). That's the heart of how we build
software, not a side experiment. People also aren't sticking to the coding
assistant we provide; they're using a few different tools.

That's where it gets a bit uncomfortable. Our coding tools are approved. But I
honestly can't say every general-purpose AI tool people have reached for has
been. When a team moves faster than the policy does, some of that is going to
happen outside the lines.

## The numbers look great, and I don't fully trust them

On average, people told us AI saves them about 11 hours a week. Almost everyone
said the quality of their work has gone up.

Eleven hours is more than a quarter of the working week. If that were really
happening, I'd expect it to jump out of our delivery data, and I haven't
checked. The same survey also told me around 70% of people fix a quarter or
more of what AI gives them before they can use it.

To be fair, both things can be true. A quick draft you then rework heavily can
still beat starting from a blank page. Self-assessment is flattering. You
remember the time a tool saved you, not the time you spent double-checking it.
It's a first survey, a small team, and there's nothing to compare it against.
I'm treating it as a signal, and a very useful baseline for when we carry out the survey again in several months. 

Next time round, I'll seek harder numbers alongside it: cycle time, rework,
defect rates. If the gains are real, they'll show up there.

## Going in with eyes open

There are three risks I'm keeping an eye on.

The first is over-trust. Oddly, that high correction rate reassures me, because
it means people are checking. What worries me is that rate dropping for the
wrong reason: people getting comfortable rather than the output getting better.
AI is very good at writing code that looks right, and code that looks right
tends to get through code review.

The second is losing our edge on hard problems. About two-thirds of the team
said complex problem-solving is the hardest part of their job, and that's
exactly where AI helps least. I haven't measured whether skills are slipping, so
this is a worry rather than a finding. But if AI takes on all the routine stuff,
people get less practice on the easier problems that build the judgement you
need for the hard ones. That matters more than it sounds. The work AI can't do is the work that depends on context it doesn't have: why the system is the way it is, what the users actually need, what broke last time. That's where engineers will be most valuable, and it's exactly the skill I'm worried about eroding.

The third is data ending up in tools we don't control. Policy and integration
came up as some of the biggest things holding people back. I don't read that as
people being careless. It's what happens when the approved option doesn't do
what you need and something else does.

## What we're doing about it

The thing holding people back most was time to experiment (around 60%), and the
most common ask was better tools. So the case I took to senior leadership
wasn't "let's encourage more use". It was "let's give people better tools, with
tighter guardrails".

They agreed to a pilot: dedicated subscriptions to AI development tools, kept
to engineering, in specific contexts, and only for data at defined sensitivity
levels. The question is simple: do proper dedicated tools get us more than
we're already getting, and what's the risk?

The pilot has to earn the right to grow. We'll widen it if the pilot group shows a measurable difference in rework or cycle time compared with everyone else. We'll stop if it doesn't, or if the cost outweighs what we're seeing. What I'm really after isn't the
tools. It's evidence good enough to make the next call without relying on how
people feel about it.

I know there's something a bit contradictory about piloting more tools while
worrying about unapproved ones. But that's the point. The best way to
stop people going around the rules is to give them an approved route that's
actually good, with boundaries clear enough that everyone knows where the line
is. Keeping the scope narrow is deliberate. We'll widen it when the evidence
says we should, not before.

## It's happening again

The pilot isn't live yet, and before it's even started, the ground's moved
again.

Everything the survey captured was what I'd call AI assistance: someone asks a
question or requests a suggestion, the tool responds once, and a person
decides what to do with it. Debugging help, code review comments, a coding
assistant's suggestion. That data is a few months old now, and it's already
out of date.

Since the survey, some of my team have started having agents write code
outright, then opening the pull request manually once the agent's done. Nobody
asked for that either. Same pattern as everything else in this post: they
didn't wait for a strategy, or for me.

That's a different shape of work from what the survey measured. A suggestion
is something you read in a few seconds and accept or reject. An agent's
multi-step change is bigger, and harder to hold in your head in one go. The
one checkpoint I know is there is the human who opens the PR. What I don't
know yet is how closely it gets read before it's approved, or whether a
good-looking diff from an agent gets the same scrutiny as one from a
colleague. That's the over-trust risk from earlier, except it's not
hypothetical any more.

On this blog, the agent opens and explains its own pull requests, and nothing
merges without a passing build and my review. My team doesn't have that
pipeline around their agentic work yet, as far as I know. Closing that gap is
a better use of the "tighter guardrails" pilot than I'd planned for.

## The bit I didn't expect

Every single thing my team said was holding them back was something leadership
controls: time, policy, guidance. None of it was a lack of interest, or
willingness. The same is true of the bit I found out after the survey closed:
nobody needed permission to start writing code with agents, and the gap that's
left behind, a pipeline that can actually catch what they're doing, is mine to
close, not theirs. If your AI strategy is mostly about which tools to buy,
you're solving the smallest part of the problem.