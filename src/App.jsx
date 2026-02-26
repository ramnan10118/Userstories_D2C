import { useState, useMemo } from 'react'
import { journeys, actors, stories } from './data/stories'

const LOCKED_SECTIONS = new Set(['support'])

// ── Helpers ───────────────────────────────────────────────────────────────────

function getActor(name) {
  return actors.find(a => a.name === name) ?? { emoji: '👤', color: '#0055AA', role: '' }
}

function getAllStages() {
  return journeys.flatMap(j => j.stages.map(s => ({ ...s, journey: j })))
}

function getStage(stageId) {
  return getAllStages().find(s => s.id === stageId)
}

// ── Pill ──────────────────────────────────────────────────────────────────────

function pillStyle(active) {
  return {
    padding: '6px 16px',
    border: `1px solid ${active ? '#080808' : '#999'}`,
    borderRadius: 20,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    color: active ? '#fff' : '#333',
    background: active ? '#080808' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  }
}

// ── NavItem ───────────────────────────────────────────────────────────────────

function NavItem({ label, count, active, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '14px 28px',
        color: active ? '#fff' : (hov ? '#fff' : '#888'),
        background: active ? 'rgba(255,255,255,0.08)' : (hov ? 'rgba(255,255,255,0.04)' : 'transparent'),
        border: 'none',
        borderLeft: `3px solid ${active ? '#fff' : 'transparent'}`,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontSize: 14, opacity: 0.5 }}>
        {String(count).padStart(2, '0')}
      </span>
    </button>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ selectedStageId, onStageSelect, storyCountByStage }) {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      backgroundColor: '#080808',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #1a1a1a',
      position: 'relative',
      flexShrink: 0,
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Nav */}
      <nav className="dark-scroll" style={{
        flex: 1,
        padding: '16px 0',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Home Button */}
        <button
          onClick={() => onStageSelect(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '14px 28px',
            background: selectedStageId === null ? 'rgba(255,255,255,0.08)' : 'transparent',
            border: 'none',
            borderLeft: `3px solid ${selectedStageId === null ? '#fff' : 'transparent'}`,
            color: selectedStageId === null ? '#fff' : '#888',
            fontSize: 14,
            fontWeight: selectedStageId === null ? 600 : 400,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (selectedStageId !== null) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.color = '#fff'
            }
          }}
          onMouseLeave={(e) => {
            if (selectedStageId !== null) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#888'
            }
          }}
        >
          Overview
        </button>

        {/* Separator */}
        <div style={{
          margin: '16px 28px',
          height: '1px',
          background: '#2a2a2a',
        }} />

        {/* Journey Creation Section */}
        <div style={{
          padding: '24px 28px 8px',
          fontSize: 10,
          textTransform: 'uppercase',
          color: '#3a3a3a',
          letterSpacing: '1.2px',
          fontWeight: 700,
        }}>
          Journey Creation
        </div>
        {journeys.filter(j => j.sectionId === 'journey-creation').map(journey => {
          const locked = LOCKED_SECTIONS.has(journey.sectionId)

          return (
            <div key={journey.id}>
              <div style={{
                padding: '24px 28px 10px',
                fontSize: 12,
                textTransform: 'uppercase',
                color: locked ? '#333' : '#555',
                letterSpacing: '1px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
                <span style={{ flex: 1 }}>{journey.name}</span>
                {locked && <span style={{ fontSize: 11, opacity: 0.4 }}>🔒</span>}
              </div>

              {!locked && journey.stages.map(stage => (
                <NavItem
                  key={stage.id}
                  label={stage.name}
                  count={storyCountByStage[stage.id] ?? 0}
                  active={selectedStageId === stage.id}
                  onClick={() => onStageSelect(stage.id)}
                />
              ))}
            </div>
          )
        })}

        {/* Separator */}
        <div style={{
          margin: '24px 28px',
          height: '1px',
          background: '#2a2a2a',
        }} />

        {/* Component Creation Section */}
        <div style={{
          padding: '8px 28px 8px',
          fontSize: 10,
          textTransform: 'uppercase',
          color: '#3a3a3a',
          letterSpacing: '1.2px',
          fontWeight: 700,
        }}>
          Component Creation
        </div>
        {journeys.filter(j => j.sectionId === 'component-creation').map(journey => {
          const locked = LOCKED_SECTIONS.has(journey.sectionId)
          const icon = journey.id === 'dsl' 
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>

          return (
            <div key={journey.id}>
              <div style={{
                padding: '24px 28px 10px',
                fontSize: 12,
                textTransform: 'uppercase',
                color: locked ? '#333' : '#555',
                letterSpacing: '1px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                {icon}
                <span style={{ flex: 1 }}>{journey.name}</span>
                {locked && <span style={{ fontSize: 11, opacity: 0.4 }}>🔒</span>}
              </div>

              {!locked && journey.stages.map(stage => (
                <NavItem
                  key={stage.id}
                  label={stage.name}
                  count={storyCountByStage[stage.id] ?? 0}
                  active={selectedStageId === stage.id}
                  onClick={() => onStageSelect(stage.id)}
                />
              ))}
            </div>
          )
        })}

        {/* Support Section */}
        {journeys.filter(j => j.sectionId === 'support').map(journey => {
          const locked = LOCKED_SECTIONS.has(journey.sectionId)

          return (
            <div key={journey.id}>
              <div style={{
                padding: '32px 28px 10px',
                fontSize: 12,
                textTransform: 'uppercase',
                color: locked ? '#333' : '#555',
                letterSpacing: '1px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ flex: 1 }}>{journey.name}</span>
                {locked && <span style={{ fontSize: 11, opacity: 0.4 }}>🔒</span>}
              </div>

              {!locked && journey.stages.map(stage => (
                <NavItem
                  key={stage.id}
                  label={stage.name}
                  count={storyCountByStage[stage.id] ?? 0}
                  active={selectedStageId === stage.id}
                  onClick={() => onStageSelect(stage.id)}
                />
              ))}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px 28px',
        borderTop: '1px solid #1a1a1a',
        position: 'relative',
        zIndex: 2,
        flexShrink: 0,
      }}>
        <p style={{ fontSize: 10, color: '#3a3a3a', fontFamily: 'var(--font-mono)', letterSpacing: '0.4px' }}>
          {stories.length} STORIES · {actors.length} ACTORS
        </p>
      </div>
    </aside>
  )
}

// ── ActorFilter ───────────────────────────────────────────────────────────────

function ActorFilter({ selected, onSelect, countByActor }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 16 }}>
      <button onClick={() => onSelect(null)} style={pillStyle(selected === null)}>
        All Actors
      </button>
      {actors.map(actor => {
        const active = selected === actor.name
        const count = countByActor[actor.name] ?? 0
        if (!count) return null
        return (
          <button
            key={actor.name}
            onClick={() => onSelect(active ? null : actor.name)}
            style={pillStyle(active)}
          >
            {actor.name}
          </button>
        )
      })}
    </div>
  )
}

// ── StoryCard ─────────────────────────────────────────────────────────────────

function StoryCard({ story, index }) {
  const actor = getActor(story.actor)
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#F9F9F9' : 'transparent',
        border: `1px solid #D8D8D8`,
        borderTop: `3px solid ${actor.color}`,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'background 0.2s ease',
        animation: 'fadeUp 360ms ease both',
        animationDelay: `${Math.min(index * 45, 380)}ms`,
      }}
    >
      {/* Header: actor name + ID */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: actor.color }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: actor.color, flexShrink: 0, display: 'inline-block' }} />
          {story.actor}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--c-black)' }}>
          #{story.id}
        </span>
      </div>

      {/* Story content */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--c-black)', marginBottom: 12 }}>
          I want to {story.want},
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--c-grey-dark)' }}>
          so that {story.soThat}.
        </p>
      </div>
    </div>
  )
}

// ── JourneyCard (overview) ────────────────────────────────────────────────────

function JourneyCard({ journey, totalCount, onStageClick, index }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#F9F9F9' : 'transparent',
        border: `1px solid ${hov ? 'var(--c-accent)' : '#D8D8D8'}`,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s ease, background 0.2s ease',
        animation: 'fadeUp 400ms ease both',
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--c-accent)', display: 'inline-block', flexShrink: 0 }} />
          {journey.name}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--c-grey-mid)', background: 'var(--c-grey-light)', padding: '2px 8px' }}>
          {totalCount}
        </span>
      </div>

      <p style={{ fontSize: 12, color: 'var(--c-grey-mid)', marginBottom: 16, lineHeight: 1.5 }}>
        {journey.tagline}
      </p>

      {/* Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {journey.stages.map(stage => (
          <button
            key={stage.id}
            onClick={() => onStageClick(stage.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              border: '1px solid var(--c-grey-light)',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s ease',
              fontFamily: 'inherit',
              width: '100%',
              color: 'var(--c-black)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#080808'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = '#080808'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--c-black)'
              e.currentTarget.style.borderColor = 'var(--c-grey-light)'
            }}
          >
            <span style={{
              width: 20,
              height: 20,
              background: '#080808',
              color: '#fff',
              fontSize: 9,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: 'var(--font-mono)',
            }}>
              {stage.order}
            </span>
            <span style={{ fontSize: 12, flex: 1, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              {stage.name}
            </span>
            <span style={{ fontSize: 12 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────────

function Overview({ onStageClick, storyCountByStage }) {
  const visibleJourneys = journeys.filter(j => !LOCKED_SECTIONS.has(j.sectionId))
  const totalByJourney = j => j.stages.reduce((s, st) => s + (storyCountByStage[st.id] ?? 0), 0)

  return (
    <div>
      {/* Actors */}
      <div style={{
        border: '1px solid #D8D8D8',
        padding: 24,
        marginBottom: 24,
        animation: 'fadeUp 400ms ease 60ms both',
      }}>
        <p style={{
          fontSize: 10,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--c-grey-mid)',
          marginBottom: 16,
        }}>
          Actors in this system
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
          {actors.map(actor => (
            <div key={actor.name} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '14px 16px',
              border: '1px solid var(--c-grey-light)',
              background: 'white',
            }}>
              <div style={{
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                background: actor.color + '14',
                flexShrink: 0,
              }}>
                {actor.emoji}
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: actor.color, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  {actor.name}
                </p>
                <p style={{ fontSize: 11, color: 'var(--c-grey-mid)', lineHeight: 1.55 }}>{actor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {visibleJourneys.map((journey, i) => (
          <JourneyCard
            key={journey.id}
            journey={journey}
            totalCount={totalByJourney(journey)}
            onStageClick={onStageClick}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}

// ── StageView ─────────────────────────────────────────────────────────────────

function StageView({ stageId, selectedActor }) {
  const filtered = useMemo(() => {
    return stories.filter(s => {
      if (s.stageId !== stageId) return false
      if (selectedActor && s.actor !== selectedActor) return false
      return true
    })
  }, [stageId, selectedActor])

  if (filtered.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 48, color: 'var(--c-grey-mid)', animation: 'fadeIn 300ms ease both' }}>
        <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>No stories match this filter.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
      {filtered.map((story, i) => (
        <StoryCard key={story.id} story={story} index={i} />
      ))}
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedStage, setSelectedStage] = useState(null)
  const [selectedActor, setSelectedActor] = useState(null)

  const storyCountByStage = useMemo(() => (
    stories.reduce((map, s) => ({ ...map, [s.stageId]: (map[s.stageId] ?? 0) + 1 }), {})
  ), [])

  const countByActor = useMemo(() => {
    const pool = selectedStage ? stories.filter(s => s.stageId === selectedStage) : stories
    return pool.reduce((map, s) => ({ ...map, [s.actor]: (map[s.actor] ?? 0) + 1 }), {})
  }, [selectedStage])

  function handleStageSelect(stageId) {
    setSelectedStage(stageId)
    setSelectedActor(null)
  }

  const currentStage = getStage(selectedStage)
  const currentJourney = currentStage?.journey

  const breadcrumb = currentJourney
    ? `User Stories / ${currentJourney.name}`
    : 'User Stories'

  const pageTitle = currentStage ? currentStage.name : 'Overview'

  const pageDesc = currentStage
    ? currentStage.description
    : 'Every story, every actor, every stage across all journeys.'

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      <Sidebar
        selectedStageId={selectedStage}
        onStageSelect={handleStageSelect}
        storyCountByStage={storyCountByStage}
      />

      <main style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: 'var(--c-off-white)',
      }}>
        {/* Header */}
        <header style={{
          padding: '32px var(--content-pad) 20px',
          backgroundColor: 'var(--c-off-white)',
          borderBottom: '1px solid var(--c-grey-light)',
          flexShrink: 0,
        }}>
          <div style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 600,
            color: 'var(--c-grey-mid)',
            marginBottom: 8,
          }}>
            {breadcrumb}
          </div>
          <h1 style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            textTransform: 'uppercase',
            fontWeight: 400,
            letterSpacing: '-0.5px',
            marginBottom: 6,
            lineHeight: 1.1,
          }}>
            {pageTitle}
          </h1>
          <p style={{ color: 'var(--c-grey-mid)', fontSize: 12, maxWidth: 420, lineHeight: 1.55 }}>
            {pageDesc}
          </p>
          {selectedStage && (
            <ActorFilter
              selected={selectedActor}
              onSelect={setSelectedActor}
              countByActor={countByActor}
            />
          )}
        </header>

        {/* Content */}
        <div style={{ flex: 1, padding: '32px var(--content-pad)', overflowY: 'auto' }}>
          {!selectedStage ? (
            <Overview
              onStageClick={handleStageSelect}
              storyCountByStage={storyCountByStage}
            />
          ) : (
            <StageView
              key={selectedStage}
              stageId={selectedStage}
              selectedActor={selectedActor}
            />
          )}
        </div>
      </main>
    </div>
  )
}
