import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const EVENT_DATE = new Date("2026-09-20T12:00:00-05:00");
const MAPS_URL = "https://maps.app.goo.gl/GXnrTvAMZg9T9PEq8";
const WHATSAPP_URL =
  "https://wa.me/593939594833?text=Hola%2C%20confirmo%20mi%20asistencia%20al%20primer%20cumplea%C3%B1os%20de%20Anthonella%20Geraldine.%20Mi%20nombre%20es%3A%20";
const AUDIO_URL = "/audio/happy-birthday.mp3";

function getTimeLeft() {
  const distance = Math.max(EVENT_DATE.getTime() - Date.now(), 0);
  return {
    dias: Math.floor(distance / 86400000),
    horas: Math.floor((distance / 3600000) % 24),
    minutos: Math.floor((distance / 60000) % 60),
    segundos: Math.floor((distance / 1000) % 60),
  };
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  );
}

function MusicIcon({ playing }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {playing ? (
        <>
          <path d="M9 18V5l10-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
        </>
      ) : (
        <>
          <path d="M9 18V5l10-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="16" cy="16" r="3" />
          <path d="M3 3l18 18" />
        </>
      )}
    </svg>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const particles = useMemo(
    () => Array.from({ length: 18 }, (_, index) => ({
      id: index,
      left: `${(index * 37) % 100}%`,
      delay: `${(index % 7) * -1.2}s`,
      duration: `${7 + (index % 5)}s`,
    })),
    [],
  );

  const openInvitation = async () => {
    setOpened(true);

    if (!audioRef.current) return;
    audioRef.current.volume = 0.35;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="invitation">
      <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />
      <div className="ambient" aria-hidden="true">
        {particles.map((particle) => (
          <i
            key={particle.id}
            className="spark"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
        <span className="floating-fairy fairy-one">🧚‍♀️</span>
        <span className="floating-fairy fairy-two">🧚</span>
      </div>

      {!opened ? (
        <section className="welcome" aria-label="Abrir invitación">
          <div className="welcome-card">
            <span className="eyebrow">Una invitación encantada</span>
            <div className="number-one">1</div>
            <h1>Anthonella Geraldine</h1>
            <p>Un día lleno de magia está por comenzar</p>
            <button className="primary-button" onClick={openInvitation}>
              Abrir invitación <span aria-hidden="true">✦</span>
            </button>
          </div>
        </section>
      ) : (
        <div className="content enter">
          <button
            className={`music-control ${isPlaying ? "is-playing" : ""}`}
            type="button"
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
            title={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            <MusicIcon playing={isPlaying} />
            <span className="music-bars" aria-hidden="true">
              <i /><i /><i />
            </span>
          </button>
          <section className="hero">
            <div className="floral-corner floral-left" aria-hidden="true">❀</div>
            <div className="floral-corner floral-right" aria-hidden="true">❀</div>
            <p className="eyebrow">Mi primer añito</p>
            <div className="hero-number" aria-hidden="true">1</div>
            <h1>Anthonella Geraldine</h1>
            <p className="surname">Tapia Sigcha</p>
            <p className="hero-message">
              Con polvo de hadas, flores y mucha alegría,<br />
              celebraremos un año de amor y magia.
            </p>
            <div className="parents">
              <span>Sus padres</span>
              <strong>Lizandra Sigcha <i>&amp;</i> Javier Tapia</strong>
              <small>tienen el honor de invitarte</small>
            </div>
          </section>

          <section className="countdown-section" aria-labelledby="countdown-title">
            <p className="section-kicker">Falta muy poquito</p>
            <h2 id="countdown-title">Cuenta regresiva</h2>
            <div className="countdown" aria-live="polite">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div className="time-box" key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="details" aria-labelledby="details-title">
            <p className="section-kicker">Acompáñanos</p>
            <h2 id="details-title">Detalles del gran día</h2>
            <div className="detail-grid">
              <article className="detail-card">
                <span className="icon-wrap"><CalendarIcon /></span>
                <h3>Fecha y hora</h3>
                <p>Domingo, 20 de septiembre</p>
                <strong>12:00 p. m.</strong>
                <a className="text-link" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Primer+a%C3%B1ito+de+Anthonella+Geraldine&dates=20260920T170000Z/20260920T210000Z&details=Celebraci%C3%B3n+del+primer+cumplea%C3%B1os+de+Anthonella&location=REVIVALS%2C+Calle+Tom%C3%A1s+de+Berlanga+e+Isla+R%C3%A1bida%2C+Barrio+Gualund%C3%BAn" target="_blank" rel="noreferrer">
                  Agregar al calendario
                </a>
              </article>

              <article className="detail-card">
                <span className="icon-wrap"><PinIcon /></span>
                <h3>REVIVALS</h3>
                <p>Calle Tomás de Berlanga e Isla Rábida</p>
                <strong>Barrio Gualundún</strong>
                <a className="text-link" href={MAPS_URL} target="_blank" rel="noreferrer">
                  Ver ubicación
                </a>
              </article>
            </div>
          </section>

          <section className="rsvp">
            <span className="rsvp-fairy" aria-hidden="true">🧚‍♀️</span>
            <p className="section-kicker">Tu presencia será nuestro mejor regalo</p>
            <h2>Confirma tu asistencia</h2>
            <p>Ayúdanos a preparar este día mágico confirmando por WhatsApp.</p>
            <a className="primary-button whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageIcon /> Confirmar asistencia
            </a>
          </section>

          <footer>
            <span>✦</span>
            <p>Con amor, la familia de Anthonella</p>
            <small>Invitación digital por KafersolucionesWeb</small>
          </footer>
        </div>
      )}
    </main>
  );
}

export default App;
