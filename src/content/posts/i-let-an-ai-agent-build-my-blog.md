---
title: "I let an AI agent build my blog. What made it safe wasn't the AI."
description: "What I learned building this blog with an AI coding agent: the safety came from the process around it and the people who can judge its work, not from the tool."
kind: build-log
date: 2026-09-24
checklist: passed
---

I want to be a CTO. I lead a technology team today, and I haven't written code in nearly four years. My team already works with agents, and I don't want to lead through this from the sidelines. So I built this blog with Claude Code, using a framework I'd never touched (Astro), and had the agent write up a timeline of what happened.

This blog is where I'll write down what I learn along the way: what AI changes about delivering technology, what it doesn't, and what a leader should do about it. This post is the first test.

## My claim

An agent is only as safe as the delivery process around it and the people who can judge its work. A leader's job is to build both, not to pick the tool.

One small project can't prove that. But it's what I saw, so here's the evidence.

## What I built

A blog with posts as Markdown files in Git, hosted on GitHub Pages on my own domain. There's no database and no servers. I chose it to be boring, so my effort went on learning, not on running infrastructure.

The whole thing took a couple of hours, from a new Mac to a live site, including the planning conversation. It cost around $3 in credits on top of my Claude Pro subscription. I'd guess a week of evenings without the agent. That's a guess, not a measurement.

## Planning came first

Before any code, a skill called grill-with-docs, from [Matt Pocock's open-source collection of agent skills](https://github.com/mattpocock/skills), grilled me on the plan. Over five rounds it worked through a long list of my assumptions, down to implementation detail. It made me think hard about what I was hoping to achieve, and it challenged me on things like who the blog was for and my preconceptions about how I'd put it together. It produced a glossary and a short record of the one decision worth recording: Astro on GitHub Pages.

## Pipeline came before pages

After the scaffold, the first things built weren't pages. They were:

- automatic checks that run the type check and build on every change
- branch protection, so nothing reaches the main branch without a pull request and a passing build, admins included
- automatic deployment

Then came the content model and the pages. To test the content checks, the agent deliberately broke a post to prove the build would fail. It did. Later we added a publishing checklist enforced by the build, tested the same way, and drafts stay hidden from the live site.

After the first commit, every change was a pull request the agent opened and explained, and I merged. Branch protection is set so there's no other route, so I don't have to rely on discipline to keep it that way. I read the setting back from GitHub, but I haven't tried pushing directly to prove it.

## What I could trace, and what I couldn't

By the end, I could answer some questions about the site from the repo alone. Building the first version took six pull requests across an evening and the following morning, 13 commits and nine automatic build runs, and every build passed. Each pull request has the agent's explanation of what it changed. The one decision worth recording has a short written record. If something breaks, I can find the change, the explanation and who merged it.

What I can't trace is how we got there. The planning conversation and the timeline of what happened live in the chat session, not in the repo. That was deliberate, because the repo is public. But it means the reasoning behind the changes sits somewhere I could lose it. On a team, that's a gap. You can see what changed, but not the request or the thinking behind it.

## What went wrong

Setup fought me first, but that was the machine, not the agent. I did this on a new Mac, so some tools weren't installed yet. The Xcode licence hadn't been accepted, which blocked git when I added the plugin. Some commands needed a real Terminal window, so I ran those myself. The scaffolding tool also ignored the instruction to build in the current folder and made a random subfolder. That one was the tool.

The agent also made a real mistake. I told it the first pull request was merged, and it wasn't. Without checking, the agent started the second pull request from the wrong base. It noticed when the code it expected wasn't there, confirmed on GitHub that the first was still open, then cleaned up and paused. From then on it checked GitHub before starting anything new. It checked my work too. I told it I'd finished the first two setup steps, and it looked at the real state: git was set up and the GitHub command-line tool was installed, but I hadn't logged in.

Both catches came from checking the real state instead of trusting anyone's memory, mine or the agent's. That's the process half of the claim. The judgement half came next.

The problems that mattered most weren't bugs. They were about judgement:

- **I set the size of the project before the agent wrote anything.** In planning I said what I wanted: boring, cheap, Markdown in Git with automated deploys, and no database. The agent worked inside that. Checks catch broken code. They don't catch a project growing far bigger than it should, so that judgement had to go into the brief. I could do it because I've spent years around technical decisions, and no build check will do it for you.
- **It explained every change, but I couldn't verify all of it.** Every pull request came with an explanation, but I'd never used Astro, so I could follow the reasoning without being able to judge whether the code was right. I could tell whether the project was the right size. I couldn't tell whether the code inside it was the right code. I don't know what I missed, and that's the risk.

Process can enforce the rules. Judging whether the work is right is still a person's job, and I could only do part of it.

## How my team works today

My team already works with agents and AI. Every change goes through code review, and a human must approve every pull request, whoever or whatever wrote it. The approval is a repository setting, so nothing merges without it. The blog's rule was a required pull request and a passing build, and my team adds a required human approval on top. The principle is the same: the system enforces the rule, not people remembering it. The agent writes, and a person approves it and is accountable for what goes in. Agents change who writes the code. They don't change who is accountable for it.

## What I don't know yet

This was one short build, one small site, one person and no production risk. My workflow was also a straight line: plan, build, review, merge. Real work gets interrupted, so I want to test how to branch off and come back without losing context. I also want to look at whether human review holds up as agents write more of the code, and whether an agent should review too. I don't have an answer yet. Those are the next two posts.
