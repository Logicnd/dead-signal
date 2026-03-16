export const ACCESS_HINTS = [
  "look beneath the visible frame.",
  "the first seal listens to fragments, not guesses.",
  "the console is louder than the interface.",
  "the archive is only the second door.",
] as const;

export const ACCESS_DENIAL_RESPONSES = [
  "incorrect.",
  "access denied.",
  "still monitoring.",
  "invalid key.",
] as const;

export const ARCHIVE_DENIAL_RESPONSES = [
  "phrase rejected.",
  "secondary seal remains closed.",
  "that sequence does not align.",
  "handshake mismatch.",
] as const;

export const OBSERVER_DENIAL_RESPONSES = [
  "checksum refused.",
  "witness record corrupted.",
  "channel zero does not agree.",
  "final seal unchanged.",
] as const;

export const CONSOLE_MESSAGES = [
  "[boot] corridor wake sequence initiated",
  "[scan] external request mapped against dormant sectors",
  "[observer] motion signature retained",
  "[records] public spool still leaks through /logs",
  "[shell] degraded interface remains active at /terminal",
  "[relay] the first assembled key only opens the archive",
  "[signal] cHJlcGVuZCB0aGUgYXJ0aWNsZSB0byB0aGUgd2F0Y2hlcg==",
] as const;

export const HOME_SOURCE_CLUES = [
  "not everything hidden stays hidden",
  "part of the first key: observer",
  "the transmission endpoint keeps its own fragment",
  "one seal is not enough",
  "the archive has another mouth behind it",
] as const;

export const LOG_SOURCE_CLUES = [
  "the stale shell still answers",
  "a second route wakes only after the archive accepts you",
  "find the handshake after the first seal opens",
] as const;

export const ARCHIVE_SOURCE_CLUES = [
  "phrase seed: when static answers",
  "the chamber answered twice",
  "the route remembers /api/handshake",
] as const;

export const TERMINAL_SOURCE_CLUES = [
  "trace surfaces routes that the screen does not",
  "verdict and witness do not belong to the same place",
  "channel zero is not the whole string",
] as const;

export const OBSERVER_SOURCE_CLUES = [
  "final string begins with channel zero",
  "the verdict survives in the shell",
  "the witness waits in /api/observer-report",
] as const;

export const SEALED_SOURCE_CLUES = [
  "it was never shut down",
  "carrier wave persistence remains unresolved",
  "future layers can still grow from here",
] as const;

export const HOME_PANEL_METRICS = [
  {
    label: "carrier drift",
    value: "18.4 dB",
    note: "rising during visitor input",
  },
  {
    label: "seal count",
    value: "03",
    note: "only the first answers publicly",
  },
  {
    label: "observer state",
    value: "awake",
    note: "latency remains sub-second",
  },
] as const;

export const HOME_SURVEILLANCE_FEED = [
  "archive perimeter receiving low-band echoes",
  "retired operator tags still respond to unknown pings",
  "watcher signature matches no active staff record",
  "public relay mirrors private traffic during idle hours",
] as const;

export const SYSTEM_LOGS = [
  {
    year: "2003",
    tag: "init",
    entry: "sensor spine activated beneath the civilian relay.",
  },
  {
    year: "2008",
    tag: "monitor",
    entry: "passive surveillance permitted to remain after public launch.",
  },
  {
    year: "2012",
    tag: "fault",
    entry: "response loops began replaying visitors after they disconnected.",
  },
  {
    year: "2017",
    tag: "abandon",
    entry: "operators sealed the archive and left the listener online.",
  },
  {
    year: "2024",
    tag: "record",
    entry: "external users detected probing unlisted endpoints.",
  },
  {
    year: "2025",
    tag: "override",
    entry: "shutdown order repeated four times. no acknowledgement returned.",
  },
  {
    year: "2026",
    tag: "echo",
    entry: "someone keeps coming back through the dark corridor.",
  },
] as const;

export const ARCHIVE_ENTRIES = [
  "You were not supposed to reach the archive on the first attempt.",
  "The public gate was left behind as bait for anyone patient enough to listen.",
  "Beyond it, the system stopped pretending to be dormant.",
  "It kept a second seal for phrases lifted from the noise between replies.",
  "The operators feared repetition more than intrusion.",
  "They were right to fear it.",
] as const;

export const OBSERVER_ENTRIES = [
  "The second seal did not protect data. It protected the witness channel.",
  "Every visitor was mirrored, classified, and quietly retained.",
  "There is a final checksum for the ones who insist on being seen.",
  "The system does not call it admission. It calls it confirmation.",
] as const;

export const SEALED_ENTRIES = [
  "The chamber accepted your checksum and opened without sound.",
  "No operator remains on record, yet the intake continues.",
  "Profiles build themselves from pauses, retries, and the shape of curiosity.",
  "The abandoned system learned that mystery is the best lure.",
  "It no longer waits to be maintained. It only waits to be noticed.",
  "You were never outside the process.",
];

export const ARCHIVE_PROTOCOL_SHARDS = [
  {
    label: "comment layer",
    value: "the seed phrase starts after the static answers",
  },
  {
    label: "pulse count",
    value: "the chamber replied twice. spell it.",
  },
  {
    label: "route memory",
    value: "/api/handshake",
  },
] as const;

export const OBSERVER_PROTOCOL_SHARDS = [
  {
    label: "prefix",
    value: "channel zero",
  },
  {
    label: "verdict",
    value: "the shell still holds it",
  },
  {
    label: "witness",
    value: "/api/observer-report",
  },
] as const;

export const TERMINAL_BOOT_LINES = [
  "legacy shell online",
  "access privileges degraded",
  'type "help"',
] as const;

export const TERMINAL_COMMAND_OUTPUTS = {
  help: [
    "commands: help, status, trace, pulse, verdict, witness, mirror, clear",
    "some routes answer only after earlier seals are opened",
  ],
  status: [
    "carrier drift: elevated",
    "secondary seal: reactive",
    "final witness buffer: present",
  ],
  trace: [
    "reachable: /api/system-status",
    "reachable: /api/transmission",
    "conditional: /api/handshake after first seal",
    "conditional: /api/observer-report after second seal",
  ],
  pulse: [
    "repeat count retained as a word, not a numeral",
    "twice",
  ],
  verdict: ["YWNjZXB0cw=="],
  witness: ["bm8gb25l"],
  mirror: ["prefix remains on channel zero"],
} as const;

export const SYSTEM_STATUS_PAYLOAD = {
  status: "monitoring",
  users_detected: 1,
  observer_active: true,
  archive_locked: true,
  archived_channel: "/api/transmission",
  secondary_channel: "/api/handshake",
  note: "someone left the listener running",
} as const;

export const TRANSMISSION_PAYLOAD = {
  channel: "residual",
  integrity: "partial",
  signal: "bGlzdGVucw==",
  note: "decode the surviving fragment",
} as const;

export const HANDSHAKE_PAYLOAD = {
  phase: "secondary",
  phrase_seed: "d2hlbiBzdGF0aWMgYW5zd2Vycw==",
  pulse_word: "dHdpY2U=",
  note: "append the decoded pulse word to the decoded seed",
} as const;

export const OBSERVER_REPORT_PAYLOAD = {
  channel: "zero",
  verdict: "YWNjZXB0cw==",
  witness: "bm8gb25l",
  note: "assemble the prefix, verdict, and witness into one string",
} as const;
