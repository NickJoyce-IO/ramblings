---
title: "I couldn't judge the code an AI wrote for me. Here's what made that tolerable."
description: "What I learned building this blog with an AI coding agent: guardrails made the work traceable, but I couldn't judge whether the code was right."
kind: build-log
date: 2026-09-24
checklist: passed
---

I want to be a CTO. I lead a technology team today, and I haven't written code in nearly four years. My team already works with agents, and I don't want to lead through this from the sidelines. So I built this blog with Claude Code, using a framework I'd never touched (Astro), and had the agent write up a timeline of what happened.

This blog is where I'll write down what I learn along the way: what AI changes about delivering technology, what it doesn't, and what a leader should do about it. This first post is the test case: what happened when I built the blog itself with an agent.

## My claim

Guardrails made the agent's work traceable. They didn't tell me whether the work was right, and I couldn't tell either.

It was tolerable because I set the scope myself and the stakes were low. A leader's job is to build the guardrails, make sure someone who can judge correctness is in the loop, and keep the stakes in line with what can actually be verified.

One small project can't prove that. But it's what I saw, so here's the evidence.

## What I built

A blog with posts as Markdown files in Git, hosted on GitHub Pages on my own domain. There's no database and no servers. I chose it to be boring, so my effort went on learning, not on running infrastructure.

The whole thing took a couple of hours, from a new Mac to a live site, including the planning conversation. It cost around $3 in credits on top of my Claude Pro subscription. I'd guess a week of evenings without the agent. That's a guess, not a measurement.

## Planning came first

Before any code, a skill called grill-with-docs, from [Matt Pocock's open-source collection of agent skills](https://github.com/mattpocock/skills), grilled me on the plan. Over five rounds it worked through a long list of my assumptions, down to implementation detail. It challenged me on things like who the blog was for and how I'd planned to put it together. It produced a glossary and a short record of the one decision worth recording: Astro on GitHub Pages.

## What the guardrails did

After the scaffold, the first things built weren't pages. They were:

- automatic checks that run the type check and build on every change
- branch protection, so nothing reaches the main branch without a pull request and a passing build, admins included
- automatic deployment

Then came the content model and the pages. To test the content checks, the agent deliberately broke a post to prove the build would fail. It did. Later we added a publishing checklist enforced by the build, tested the same way, and drafts stay hidden from the live site.

After the first commit, every change was a pull request the agent opened and explained, and I merged. Branch protection is set so there's no other route, so I don't have to rely on discipline. I read the setting back from GitHub, but I haven't tried pushing directly to prove it.

Here is what that bought me. Building the first version took six pull requests across an evening and the following morning, 13 commits and nine automatic build runs. Every automatic run passed. The only failure was a local build we broke on purpose, to prove the checks could fail. That isn't proof the code is right. Checks only catch what someone thought to check for.

What the guardrails did give me was a trail. Each pull request has the agent's explanation of what it changed, and the one decision worth recording has a short written record. If something breaks, I can find the change, the explanation and who merged it.

What I can't trace is how we got there. The planning conversation and the timeline live in the chat session, not in the repo. That was deliberate, because the repo is public. But it means the reasoning behind the changes sits somewhere I could lose it. On a team, that's a gap: you can see what changed, but not the request or the thinking behind it.

## What went wrong

Setup fought me first, but that was the machine, not the agent. It was a new Mac, so tools were missing and the Xcode licence hadn't been accepted, which blocked git. Some commands needed a real Terminal window, so I ran those myself. The scaffolding tool also ignored the instruction to build in the current folder and made a random subfolder.

The agent also made a real mistake. I told it the first pull request was merged, and it wasn't. Without checking, it started the second pull request from the wrong base. It noticed when the code it expected wasn't there, confirmed on GitHub that the first was still open, then cleaned up and paused. From then on it checked GitHub before starting anything new. It checked my work too. I told it I'd finished the first two setup steps, and it looked at the real state: git was set up and the GitHub command-line tool was installed, but I hadn't logged in.

Both catches came from checking the real state instead of trusting anyone's memory, mine or the agent's. That was a working habit, not part of the pipeline. Nothing in the setup forced it.

## The gap I couldn't close

The problems that mattered most weren't bugs. They were about judgement, and I could do one kind and not the other.

- **Scope: I could judge it.** I set the size of the project before the agent wrote anything. In planning I said what I wanted: boring, cheap, Markdown in Git with automated deploys, and no database. The agent worked inside that. Checks catch broken code. They don't catch a project growing far bigger than it should, so that judgement had to go into the brief. I could make it because I've spent years around technical decisions, and no build check will do it for you.
- **Correctness: I couldn't.** Every pull request came with an explanation, but I'd never used Astro. I could follow the reasoning without being able to tell whether the code was right. I don't know what I missed, and that's the risk.

That is the CTO problem in miniature: being accountable for work you can't personally verify. The stakes here were low, not zero: the site is public and under my name, which is why it has a publishing checklist enforced by the build. That made the gap tolerable. On a team's production system, the stakes wouldn't be low, and the gap wouldn't be tolerable.

## What a leader should do about it

This is what I'd take from one small build:

1. **Set the scope yourself, before the agent starts.** No check will do it for you.
2. **Make the system enforce the rules.** Branch protection and required checks mean nothing depends on anyone remembering.
3. **Put someone who can judge correctness in the loop, and match the stakes to what can be verified.** I couldn't do the first on the blog, so I kept the stakes low.

Agents change who writes the code. They don't change who is accountable for it.

## How my team works today

My team already works with agents. Every change goes through code review, and a human must approve every pull request, whoever or whatever wrote it. That approval is a repository setting, the same principle as the blog's rules with a required approval on top. It only helps if the approver can judge whether the work is right, not just click merge.

## What I don't know yet

This was one short build, one small site, one person and low stakes. My workflow was also a straight line: plan, build, review, merge. Real work gets interrupted, so I want to test how to branch off and come back without losing context. I also want to look at whether human review holds up as agents write more of the code, and whether an agent should review too. I don't have an answer yet. Those are the next two posts.
