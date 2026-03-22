import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Sparkles, Loader2 } from "lucide-react";

const PLACEHOLDER_QUESTIONS = [
  "Støtter AviSafe sjekklister?",
  "Hvordan fungerer SORA i AviSafe?",
  "Kan jeg laste opp DJI-logger?",
  "Har AviSafe en kalenderfunksjon?",
  "Hva koster AviSafe?",
  "Støtter AviSafe ECCAIRS-rapportering?",
  "Kan jeg se live lufttrafikk i kartet?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/avisafe-ai`;

type Msg = { role: "user" | "assistant"; content: string };

const AiSearch = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  // Typewriter animation
  useEffect(() => {
    if (query) return; // Don't animate when user is typing
    let questionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentQuestion = PLACEHOLDER_QUESTIONS[questionIndex];

      if (!isDeleting) {
        charIndex++;
        setPlaceholderText(currentQuestion.slice(0, charIndex));
        if (charIndex === currentQuestion.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 2000);
          return;
        }
        timeout = setTimeout(tick, 50);
      } else {
        charIndex--;
        setPlaceholderText(currentQuestion.slice(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          questionIndex = (questionIndex + 1) % PLACEHOLDER_QUESTIONS.length;
          timeout = setTimeout(tick, 300);
          return;
        }
        timeout = setTimeout(tick, 25);
      }
    };

    tick();
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Msg = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setQuery("");
      setIsOpen(true);
      setIsLoading(true);

      let assistantSoFar = "";

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!resp.ok) {
          const errData = await resp.json().catch(() => ({}));
          throw new Error(errData.error || "Noe gikk galt");
        }

        if (!resp.body) throw new Error("No response body");

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantSoFar += content;
                setMessages((prev) => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant") {
                    return prev.map((m, i) =>
                      i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                    );
                  }
                  return [...prev, { role: "assistant", content: assistantSoFar }];
                });
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      } catch (err) {
        console.error("AI search error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Beklager, noe gikk galt. Prøv igjen senere.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [query, messages, isLoading]
  );

  // Auto-scroll response area
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClear = () => {
    setMessages([]);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="container mx-auto px-4 mb-10">
      <div className="max-w-3xl mx-auto">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="relative">
          <div
            className="flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl px-4 py-3 md:px-6 md:py-4"
            style={{
              borderRadius: isOpen ? "1rem 1rem 0 0" : "1rem",
            }}
          >
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholderText || "Spør om AviSafe..."}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base"
            />
            {(query || isOpen) && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-primary text-primary-foreground rounded-lg p-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>

        {/* Response Area */}
        {isOpen && messages.length > 0 && (
          <div
            ref={responseRef}
            className="bg-card/80 backdrop-blur-sm border border-t-0 border-border/50 rounded-b-2xl shadow-xl max-h-[50vh] overflow-y-auto"
          >
            <div className="px-4 py-4 md:px-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === "user" ? "text-right" : ""}>
                  {msg.role === "user" ? (
                    <span className="inline-block bg-primary/10 text-foreground px-3 py-1.5 rounded-xl text-sm">
                      {msg.content}
                    </span>
                  ) : (
                    <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                      {isLoading && i === messages.length - 1 && (
                        <span className="inline-block w-1.5 h-4 bg-primary/60 ml-0.5 animate-pulse rounded-sm" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiSearch;
