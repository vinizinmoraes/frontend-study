import type { ComponentType } from "react";

import Stopwatch from "./01-stopwatch/Stopwatch";
import TrafficLight from "./02-traffic-light/TrafficLight";
import DebouncedSearch from "./03-debounced-search/DebouncedSearch";
import UseFetchDemo from "./04-use-fetch/UseFetchDemo";
import TodoList from "./05-todo-list/TodoList";
import Accordion from "./06-accordion/Accordion";
import StarRating from "./07-star-rating/StarRating";
import InfiniteScroll from "./08-infinite-scroll/InfiniteScroll";
import StaleClosure from "./09-stale-closure/StaleClosure";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Kind = "reference" | "starter";

export interface Challenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  /** "reference" = fully solved, study the pattern. "starter" = your turn, fill in the TODOs. */
  kind: Kind;
  tags: string[];
  /** One-line interview framing. */
  summary: string;
  component: ComponentType;
}

export const challenges: Challenge[] = [
  {
    id: "01-stopwatch",
    title: "Stopwatch / Timer",
    difficulty: "Easy",
    kind: "reference",
    tags: ["setInterval", "useRef", "cleanup"],
    summary:
      "Start/stop/reset a timer. Tests interval cleanup and why you should not store timers in state.",
    component: Stopwatch,
  },
  {
    id: "02-traffic-light",
    title: "Traffic Light",
    difficulty: "Easy",
    kind: "starter",
    tags: ["state machine", "setTimeout", "useEffect"],
    summary:
      "Cycle red → green → yellow on a timer. A tiny finite state machine driven by effects.",
    component: TrafficLight,
  },
  {
    id: "03-debounced-search",
    title: "Debounced Search (Autocomplete)",
    difficulty: "Hard",
    kind: "reference",
    tags: ["debounce", "fetch", "AbortController", "race conditions"],
    summary:
      "Type-ahead search. The senior signal: debouncing AND cancelling stale in-flight requests.",
    component: DebouncedSearch,
  },
  {
    id: "04-use-fetch",
    title: "useFetch custom hook",
    difficulty: "Medium",
    kind: "reference",
    tags: ["custom hooks", "fetch", "loading/error", "generics"],
    summary:
      "Extract data fetching into a reusable, typed hook with loading/error/abort handling.",
    component: UseFetchDemo,
  },
  {
    id: "05-todo-list",
    title: "Todo List + Filters",
    difficulty: "Easy",
    kind: "starter",
    tags: ["useState", "CRUD", "derived state", "localStorage"],
    summary:
      "The classic. Add/toggle/delete/filter todos, persisted to localStorage.",
    component: TodoList,
  },
  {
    id: "06-accordion",
    title: "Accordion",
    difficulty: "Medium",
    kind: "starter",
    tags: ["controlled vs uncontrolled", "a11y", "composition"],
    summary:
      "Expand/collapse panels. Single vs multi-open, keyboard support, ARIA attributes.",
    component: Accordion,
  },
  {
    id: "07-star-rating",
    title: "Star Rating",
    difficulty: "Medium",
    kind: "starter",
    tags: ["hover state", "controlled input", "keyboard a11y"],
    summary:
      "Hover-preview star rating. Looks trivial; the keyboard + accessibility part is the test.",
    component: StarRating,
  },
  {
    id: "08-infinite-scroll",
    title: "Infinite Scroll",
    difficulty: "Hard",
    kind: "starter",
    tags: ["IntersectionObserver", "pagination", "useRef", "useCallback"],
    summary:
      "Load the next page when a sentinel scrolls into view. Avoid duplicate fetches.",
    component: InfiniteScroll,
  },
  {
    id: "09-stale-closure",
    title: "The Stale Closure Bug",
    difficulty: "Medium",
    kind: "reference",
    tags: ["closures", "useEffect deps", "functional updates"],
    summary:
      "A counter that mysteriously freezes at 1. Understand WHY, then three ways to fix it.",
    component: StaleClosure,
  },
];

export function getChallenge(id: string | null): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}
