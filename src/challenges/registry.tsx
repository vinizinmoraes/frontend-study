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
import SignupForm from "./10-form-validation/SignupForm";
import ModalDemo from "./11-modal/ModalDemo";
import Performance from "./12-performance/Performance";

import TrafficLightSolution from "./02-traffic-light/solution/TrafficLightSolution";
import TodoListSolution from "./05-todo-list/solution/TodoListSolution";
import AccordionSolution from "./06-accordion/solution/AccordionSolution";
import StarRatingSolution from "./07-star-rating/solution/StarRatingSolution";
import InfiniteScrollSolution from "./08-infinite-scroll/solution/InfiniteScrollSolution";
import SignupFormSolution from "./10-form-validation/solution/SignupFormSolution";

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
  /** For starters: the worked solution, shown via a toggle in the app. */
  solution?: ComponentType;
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
    solution: TrafficLightSolution,
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
    solution: TodoListSolution,
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
    solution: AccordionSolution,
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
    solution: StarRatingSolution,
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
    solution: InfiniteScrollSolution,
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
  {
    id: "10-form-validation",
    title: "Form Validation",
    difficulty: "Medium",
    kind: "starter",
    tags: ["controlled inputs", "validation", "touched state", "async submit"],
    summary:
      "Signup form with validation. The test is WHEN you show errors (touched/blur), not just how.",
    component: SignupForm,
    solution: SignupFormSolution,
  },
  {
    id: "11-modal",
    title: "Modal / Dialog (focus trap)",
    difficulty: "Hard",
    kind: "reference",
    tags: ["portals", "focus trap", "a11y", "Esc / scroll lock"],
    summary:
      "Accessible dialog: portal, Esc, backdrop click, focus trap + restore. The a11y 40% most people miss.",
    component: ModalDemo,
  },
  {
    id: "12-performance",
    title: "Performance: memo / useCallback / useMemo",
    difficulty: "Medium",
    kind: "reference",
    tags: ["React.memo", "useCallback", "useMemo", "re-renders"],
    summary:
      "Watch render counters. Learn what actually causes re-renders and when memoization helps (and hurts).",
    component: Performance,
  },
];

export function getChallenge(id: string | null): Challenge | undefined {
  return challenges.find((c) => c.id === id);
}
