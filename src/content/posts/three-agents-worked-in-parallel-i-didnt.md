---
title: "Three agents worked in parallel. I didn't."
description: "I ran three coding agents at once on one codebase. The implementation ran in parallel. The planning before it and the review after it still ran through me."
date: 2026-10-14
kind: essay
checklist: passed
---

At the end of my first post I said the next two would be about branching off mid-task, and about whether human review holds up as agents write more of the code. This is the review one. Branching off mid-task is still to come.

To test review properly, I needed more code arriving than one agent produces. So I ran three Claude Code agents at the same time on a side project, each working on its own ticket in its own copy of the code. This took around an hour and if I was doing it without agents would likely take a week.

## My observation

Agents can do the implementation in parallel. The planning before it and the review after it don't run in parallel. They still sit with the engineer, and with three agents there's more of both, not less.

One run of three tickets can't prove that. But it's what I saw, so here's the evidence.

## The setup

Each agent got its own git worktree, which is a separate checkout of the repo on its own branch. Each ran in its own terminal pane, with its own Claude Code session, working on one ticket. The work came back to the main branch as one pull request per ticket, merged one at a time.

The setup itself was mechanical. The interesting parts were either side of it.

## Planning came first, again

I used the same [collection of agent skills from Matt Pocock](https://github.com/mattpocock/skills) as last time, and leaned on more of it:

- **grill-with-docs** worked through the idea with me until it became firm decisions, written down in a glossary and short decision records.
- **A spec** went up as a GitHub issue, including how the work would be tested.
- **Tickets** came out of the spec. Each one is a thin slice that works end to end and says which other tickets block it. I recorded those blocking links as GitHub's own issue dependencies, so they live in one place rather than buried in ticket text.

That dependency map told me which tickets could run at the same time: ones whose blockers were already done, and which didn't block each other. That gave me three: a watch mode, a verify command and a publish command.

## The tickets weren't as independent as they looked

On paper, none of the three depended on another. In practice, they overlapped in two places:

- All three needed to add a new command to the same entry point.
- The verify command needed to read a particular set of files, and the publish command needed to leave those same files out. Nobody had decided where those files lived.

Agents running in parallel don't talk to each other. Any decision the plan leaves open, each agent makes for itself, and they make it differently: different file layouts, different abstractions, different names for the same thing. I'd have got three answers to where commands go, and two answers to where those files live. The pull requests would have clashed in the code and, worse, in the design.

So before starting any agent, I committed a small shared base to main:

- a simple command router, so each new command is a new file plus one line in a table
- a separate package for the verify and publish tooling
- a written-down layout for the shared files, with an example that uses it

It was a small commit, but it's the reason the three pieces of work fitted together at the end. Spotting the overlap needed someone looking at all three tickets at once, and each agent only ever saw its own. That part of planning couldn't be handed to the agents.

## Review is where it piled up

This is the part I set out to test.

Each agent reviewed its own work before opening a pull request. I told each one to compare its branch against main, so it reviewed only its own changes.

That's a useful first pass. But it's an agent marking its own homework, and it can only see its own branch. It can't tell you whether three pieces of work fit together.

Then the pull requests came back to me, close together. This is where I have to be honest: three PRs were overwhelming, and I didn't give them the attention they deserved. That's fine for my hobby project; it wouldn't be OK for something going to production.

Merging added review I hadn't planned for. I merged the smallest pull request first. That changed main, so the other two branches had to be rebased onto it, with an agent resolving any conflicts. After a rebase, the code you merge isn't always exactly the code you reviewed, especially where conflicts had to be fixed. So review doesn't happen once per pull request. It comes round again after every merge, for every branch still waiting.

In my first post I said a human approval only helps if the approver can judge whether the work is right. Running agents in parallel adds a second condition: the approver needs the time to actually do it. Three agents can produce code faster than one person can properly read it.

## Where my time went

- setting up three copies of the repo, installing dependencies in each, and sorting out the toolchain (the project needs Node 24, which isn't my default)
- watching three sessions, and answering their questions as they came up
- reviewing each pull request, choosing the merge order, triggering rebases and checking the conflict fixes
- tidying up the copies and branches afterwards

None of that is writing code. It's planning, coordinating and reviewing, which is a tech lead's job. The agents did the implementation. Everything around it was still mine.

## What a leader should do about it

1. **Budget for planning and review, not just implementation.** If agents make writing code faster, the bottleneck moves to whoever plans and reviews it. Their time becomes the constraint.
2. **Count review capacity, not pull requests.** An engineer running three agents can open three times as many pull requests. That's only a gain if someone can review them properly.
3. **Write the shared decisions down before the work splits.** A glossary, decision records and a small shared base cost little up front, and they're what stops parallel work clashing.

My team already requires a human to approve every pull request. If people start running agents in parallel, that rule stays the same. The load on the person approving doesn't.

The agents worked in parallel. The judgement didn't.

## What I don't know yet

This was one run, three tickets, a side project, and me doing every job. On a team, planning and review would be spread across people, which changes the maths.

I also want to know whether a separate reviewing agent, one that can see all the branches at once, would catch the problems that cut across them. That's the "should an agent review too" question from my first post, and I don't have an answer yet.

---

## Appendix: how I set it up

For anyone who wants to try it. This was on a Mac with iTerm, but tmux works too.

One worktree per agent, each on its own branch:

```sh
cd ~/fieldwork
git worktree add ../fieldwork-3 -b issue-3-focus-watch
git worktree add ../fieldwork-4 -b issue-4-verify
git worktree add ../fieldwork-5 -b issue-5-publish

# node_modules isn't shared between worktrees
for n in 3 4 5; do (cd ../fieldwork-$n && npm install); done
```

In each terminal pane, start Claude Code in that worktree and point it at its ticket:

```sh
cd ~/fieldwork-3 && claude
```

When an agent reaches its review step, tell it to compare against main so it only reviews its own branch. When it's done, ask it to push and open a pull request.

Merge the smallest pull request first, rebase the others onto main, resolve any conflicts, and repeat. If each commit message says `Closes #N`, each merge closes its issue.

To tidy up:

```sh
cd ~/fieldwork && git pull
git worktree remove ../fieldwork-3
git worktree remove ../fieldwork-4
git worktree remove ../fieldwork-5
git branch -d issue-3-focus-watch issue-4-verify issue-5-publish
```

One gotcha: `git worktree remove` refuses if there are untracked files. Mine was a leftover editor swap file. Check nothing real is left, then use `--force`. Also, `git branch -d` may refuse to delete branches after a squash merge, because their commits aren't ancestors of `main`. If that happens, first confirm the pull requests were merged; only then use `git branch -D` to remove those local branches.
