import { useState, useMemo } from 'react'
import { journeys, actors, stories, sections } from './data/stories'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getActor(name) {
  return actors.find(a => a.name === name) ?? { emoji: '👤', color: '#6841E6', role: '' }
}

function getAllStages() {
  return journeys.flatMap(j => j.stages.map(s => ({ ...s, journey: j })))
}

function getStage(stageId) {
  return getAllStages().find(s => s.id === stageId)
}

// ── StoryCard ─────────────────────────────────────────────────────────────────

function StoryCard({ story, index }) {
  const stage = getStage(story.stageId)
  const journey = stage?.journey
  const actor = getActor(story.actor)
  const [hovered, setHovered] = useState(false)

  const accent = journey?.color.accent ?? '#6841E6'
  const bg     = journey?.color.bg     ?? '#F5F3FF'
  const border = journey?.color.border ?? '#D9D8FC'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '20px 22px',
        border: `1.5px solid ${hovered ? accent + '50' : border}`,
        boxShadow: hovered
          ? `0 8px 28px ${accent}18, 0 2px 8px rgba(0,0,0,0.05)`
          : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'all 200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        animation: 'fadeUp 380ms cubic-bezier(0.215, 0.61, 0.355, 1) both',
        animationDelay: `${Math.min(index * 55, 400)}ms`,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: accent,
          background: bg,
          border: `1px solid ${border}`,
          padding: '2px 9px',
          borderRadius: 999,
          fontFamily: 'monospace',
          flexShrink: 0,
        }}>
          {story.id}
        </span>
        <span style={{ flex: 1 }} />
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontSize: 12,
          fontWeight: 500,
          color: actor.color,
          background: actor.color + '14',
          padding: '3px 10px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {actor.emoji} {story.actor}
        </span>
      </div>

      {/* Body */}
      <div>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: '#1a1a2e', marginBottom: 10 }}>
          <span style={{ fontWeight: 600, color: accent }}>As a {story.actor}, </span>
          I want to {story.want}.
        </p>
        <div style={{
          background: bg,
          borderLeft: `3px solid ${accent}`,
          borderRadius: '0 8px 8px 0',
          padding: '9px 13px',
        }}>
          <span style={{
            display: 'block',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 4,
          }}>
            So that
          </span>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#474649' }}>
            {story.soThat}.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ selectedStageId, onStageSelect, storyCountByStage }) {
  const [expandedJourneys, setExpandedJourneys] = useState(
    () => Object.fromEntries(journeys.map(j => [j.id, true]))
  )

  function toggleJourney(id) {
    setExpandedJourneys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside style={{
      width: 272,
      minHeight: '100vh',
      background: '#fff',
      borderRight: '1.5px solid #EBEBEB',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      flexShrink: 0,
      animation: 'slideInLeft 380ms cubic-bezier(0.215, 0.61, 0.355, 1) both',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 18px', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #6841E6, #9B8FF6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
          }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>Quark DS</span>
        </div>
        <p style={{ fontSize: 11, color: '#7A7B7D' }}>User Stories by Journey</p>
      </div>

      {/* All */}
      <div style={{ padding: '10px 12px 0' }}>
        <button
          onClick={() => onStageSelect(null)}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: 10,
            border: 'none',
            background: selectedStageId === null ? '#F5F3FF' : 'transparent',
            color: selectedStageId === null ? '#6841E6' : '#474649',
            fontWeight: selectedStageId === null ? 600 : 400,
            fontSize: 13,
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 150ms ease',
            fontFamily: 'inherit',
          }}
        >
          <span>🗂️ Overview</span>
          <span style={{
            background: selectedStageId === null ? '#6841E6' : '#E0E0E1',
            color: selectedStageId === null ? '#fff' : '#474649',
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 700,
            padding: '1px 7px',
            transition: 'all 150ms ease',
          }}>
            {stories.length}
          </span>
        </button>
      </div>

      {/* Journeys grouped by section */}
      <nav style={{ padding: '8px 12px', flex: 1 }}>
        {sections.map((section, sectionIndex) => {
          const sectionJourneys = journeys.filter(j => j.sectionId === section.id)
          if (sectionJourneys.length === 0) return null

          return (
            <div key={section.id}>
              {/* Section separator + label */}
              {sectionIndex > 0 && (
                <div style={{ borderTop: '1px solid #EBEBEB', margin: '8px 0 6px' }} />
              )}
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: '#B7B7B8',
                padding: '4px 4px 2px',
              }}>
                {section.label}
              </div>

              {sectionJourneys.map(journey => {
                const expanded = expandedJourneys[journey.id]
                const totalInJourney = journey.stages.reduce(
                  (sum, s) => sum + (storyCountByStage[s.id] ?? 0), 0
                )

                return (
                  <div key={journey.id} style={{ marginBottom: 4 }}>
                    {/* Journey header */}
                    <button
                      onClick={() => toggleJourney(journey.id)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: 'none',
                        background: journey.color.muted,
                        color: journey.color.accent,
                        fontSize: 12,
                        fontWeight: 700,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        marginTop: 6,
                        marginBottom: expanded ? 4 : 0,
                        transition: 'all 150ms ease',
                        fontFamily: 'inherit',
                        letterSpacing: '0.01em',
                      }}
                    >
                      <span style={{ fontSize: 15 }}>{journey.emoji}</span>
                      <span style={{ flex: 1, lineHeight: 1.3 }}>{journey.name}</span>
                      <span style={{
                        background: journey.color.accent,
                        color: '#fff',
                        borderRadius: 999,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '1px 7px',
                        flexShrink: 0,
                      }}>
                        {totalInJourney}
                      </span>
                      <span style={{
                        fontSize: 10,
                        opacity: 0.7,
                        transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 200ms ease',
                        flexShrink: 0,
                      }}>
                        ▼
                      </span>
                    </button>

                    {/* Stages */}
                    {expanded && (
                      <div style={{ paddingLeft: 8 }}>
                        {journey.stages.map((stage) => {
                          const active = selectedStageId === stage.id
                          const count  = storyCountByStage[stage.id] ?? 0
                          return (
                            <button
                              key={stage.id}
                              onClick={() => onStageSelect(stage.id)}
                              style={{
                                width: '100%',
                                padding: '8px 10px',
                                borderRadius: 8,
                                border: 'none',
                                background: active ? journey.color.bg : 'transparent',
                                color: active ? journey.color.accent : '#474649',
                                fontWeight: active ? 600 : 400,
                                fontSize: 13,
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                marginBottom: 1,
                                transition: 'all 130ms ease',
                                borderLeft: active ? `3px solid ${journey.color.accent}` : '3px solid transparent',
                                fontFamily: 'inherit',
                              }}
                            >
                              <span style={{
                                width: 20,
                                height: 20,
                                borderRadius: 6,
                                background: active ? journey.color.accent : '#F5F5F5',
                                color: active ? '#fff' : '#7A7B7D',
                                fontSize: 9,
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 150ms ease',
                              }}>
                                {stage.order}
                              </span>
                              <span style={{ flex: 1, lineHeight: 1.3, fontSize: 12 }}>
                                {stage.name}
                              </span>
                              <span style={{
                                background: active ? journey.color.accent : '#E0E0E1',
                                color: active ? '#fff' : '#474649',
                                borderRadius: 999,
                                fontSize: 9,
                                fontWeight: 700,
                                padding: '1px 6px',
                                flexShrink: 0,
                                transition: 'all 150ms ease',
                              }}>
                                {count}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid #EBEBEB' }}>
        <p style={{ fontSize: 11, color: '#B7B7B8' }}>
          {stories.length} stories · {journeys.length} journeys · {actors.length} actors
        </p>
      </div>
    </aside>
  )
}

// ── ActorFilter ───────────────────────────────────────────────────────────────

function ActorFilter({ selected, onSelect, countByActor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#7A7B7D', marginRight: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Filter
      </span>
      <button
        onClick={() => onSelect(null)}
        style={{
          padding: '5px 12px',
          borderRadius: 999,
          border: `1.5px solid ${selected === null ? '#6841E6' : '#E0E0E1'}`,
          background: selected === null ? '#6841E6' : '#fff',
          color: selected === null ? '#fff' : '#474649',
          fontSize: 12,
          fontWeight: selected === null ? 600 : 400,
          cursor: 'pointer',
          transition: 'all 150ms ease',
          fontFamily: 'inherit',
        }}
      >
        All actors
      </button>
      {actors.map(actor => {
        const active = selected === actor.name
        const count  = countByActor[actor.name] ?? 0
        if (!count) return null
        return (
          <button
            key={actor.name}
            onClick={() => onSelect(active ? null : actor.name)}
            style={{
              padding: '5px 12px',
              borderRadius: 999,
              border: `1.5px solid ${active ? actor.color : '#E0E0E1'}`,
              background: active ? actor.color + '14' : '#fff',
              color: active ? actor.color : '#474649',
              fontSize: 12,
              fontWeight: active ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 150ms ease',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'inherit',
            }}
          >
            {actor.emoji} {actor.name}
            <span style={{
              background: active ? actor.color : '#E0E0E1',
              color: active ? '#fff' : '#474649',
              borderRadius: 999,
              fontSize: 9,
              fontWeight: 700,
              padding: '0px 5px',
            }}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ── JourneyCard (overview) ────────────────────────────────────────────────────

function JourneyCard({ journey, totalCount, onStageClick, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `2px solid ${hovered ? journey.color.accent : journey.color.border}`,
        borderRadius: 20,
        padding: '24px',
        animation: 'fadeUp 400ms cubic-bezier(0.215, 0.61, 0.355, 1) both',
        animationDelay: `${index * 90}ms`,
        transition: 'all 200ms cubic-bezier(0.215, 0.61, 0.355, 1)',
        boxShadow: hovered ? `0 12px 40px ${journey.color.accent}1A` : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: journey.color.bg,
          border: `1.5px solid ${journey.color.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          transition: 'transform 200ms ease',
          transform: hovered ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
        }}>
          {journey.emoji}
        </div>
        <span style={{
          background: journey.color.accent,
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: 999,
        }}>
          {totalCount} stories
        </span>
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>
        {journey.name}
      </h3>
      <p style={{ fontSize: 13, color: '#7A7B7D', lineHeight: 1.5, marginBottom: 20 }}>
        {journey.tagline}
      </p>

      {/* Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {journey.stages.map(stage => (
          <button
            key={stage.id}
            onClick={() => onStageClick(stage.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 10,
              border: `1px solid ${journey.color.border}`,
              background: journey.color.bg,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 150ms ease',
              fontFamily: 'inherit',
              width: '100%',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = journey.color.light
              e.currentTarget.style.borderColor = journey.color.accent + '60'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = journey.color.bg
              e.currentTarget.style.borderColor = journey.color.border
            }}
          >
            <span style={{
              width: 22,
              height: 22,
              borderRadius: 7,
              background: journey.color.accent,
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {stage.order}
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e', flex: 1 }}>
              {stage.emoji} {stage.name}
            </span>
            <span style={{ fontSize: 11, color: journey.color.accent, fontWeight: 600 }}>
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Overview ──────────────────────────────────────────────────────────────────

function Overview({ onStageClick, storyCountByStage }) {
  const totalByJourney = (journey) =>
    journey.stages.reduce((s, st) => s + (storyCountByStage[st.id] ?? 0), 0)

  return (
    <div>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #6841E6 0%, #9B8FF6 100%)',
        borderRadius: 20,
        padding: '28px 32px',
        marginBottom: 28,
        color: '#fff',
        animation: 'scaleIn 380ms cubic-bezier(0.215, 0.61, 0.355, 1) both',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 50, bottom: -50, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, position: 'relative' }}>
          Design System — User Stories
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 24, position: 'relative', maxWidth: 500, lineHeight: 1.6 }}>
          Every story, every actor, every stage. Two core journeys — the Designer who creates screens,
          and the Design System Lead who builds the system they compose with.
        </p>
        <div style={{ display: 'flex', gap: 16, position: 'relative', flexWrap: 'wrap' }}>
          {[
            { label: 'Stories', value: stories.length },
            { label: 'Journeys', value: journeys.length },
            { label: 'Actors', value: actors.length },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '10px 18px',
              backdropFilter: 'blur(6px)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.8, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actors legend */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '18px 22px',
        marginBottom: 24,
        border: '1.5px solid #EBEBEB',
        animation: 'fadeUp 400ms cubic-bezier(0.215, 0.61, 0.355, 1) 80ms both',
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#7A7B7D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Actors in this system
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {actors.map(actor => (
            <div key={actor.name} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              background: actor.color + '0D',
              border: `1px solid ${actor.color}28`,
              borderRadius: 12,
              padding: '10px 14px',
              flex: '1 1 220px',
            }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{actor.emoji}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: actor.color, marginBottom: 3 }}>{actor.name}</p>
                <p style={{ fontSize: 11, color: '#7A7B7D', lineHeight: 1.5 }}>{actor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {journeys.map((journey, i) => (
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

function StageView({ stageId, selectedActor, onActorSelect }) {
  const stage = getStage(stageId)
  const journey = stage?.journey

  const filtered = useMemo(() => {
    return stories.filter(s => {
      if (s.stageId !== stageId) return false
      if (selectedActor && s.actor !== selectedActor) return false
      return true
    })
  }, [stageId, selectedActor])

  const countByActor = useMemo(() => {
    const all = stories.filter(s => s.stageId === stageId)
    return all.reduce((map, s) => ({ ...map, [s.actor]: (map[s.actor] ?? 0) + 1 }), {})
  }, [stageId])

  if (!stage) return null

  return (
    <div>
      {/* Stage header */}
      <div style={{
        background: journey.color.bg,
        border: `1.5px solid ${journey.color.border}`,
        borderRadius: 16,
        padding: '20px 24px',
        marginBottom: 22,
        animation: 'fadeUp 300ms cubic-bezier(0.215, 0.61, 0.355, 1) both',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: journey.color.accent,
          color: '#fff',
          fontSize: 11,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {stage.order}
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: journey.color.accent, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
            {journey.emoji} {journey.name} · Stage {stage.order}
          </p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>
            {stage.emoji} {stage.name}
          </h2>
          <p style={{ fontSize: 13, color: '#474649', lineHeight: 1.6, maxWidth: 600 }}>
            {stage.description}
          </p>
        </div>
      </div>

      <ActorFilter
        selected={selectedActor}
        onSelect={onActorSelect}
        countByActor={countByActor}
      />

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', color: '#7A7B7D', animation: 'fadeIn 300ms ease both' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: 14 }}>No stories match this filter.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
          {filtered.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedStage, setSelectedStage] = useState(null)
  const [selectedActor, setSelectedActor] = useState(null)

  const storyCountByStage = useMemo(() => {
    return stories.reduce((map, s) => ({ ...map, [s.stageId]: (map[s.stageId] ?? 0) + 1 }), {})
  }, [])

  function handleStageSelect(stageId) {
    setSelectedStage(stageId)
    setSelectedActor(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentStage = getStage(selectedStage)
  const currentJourney = currentStage?.journey

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F4F3FF' }}>
      <Sidebar
        selectedStageId={selectedStage}
        onStageSelect={handleStageSelect}
        storyCountByStage={storyCountByStage}
      />

      <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', minWidth: 0 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          <button
            onClick={() => handleStageSelect(null)}
            style={{
              background: 'none', border: 'none', fontSize: 13,
              color: selectedStage ? '#6841E6' : '#1a1a2e',
              fontWeight: selectedStage ? 500 : 700,
              cursor: selectedStage ? 'pointer' : 'default',
              padding: 0, fontFamily: 'inherit',
            }}
          >
            Overview
          </button>
          {currentJourney && (
            <>
              <span style={{ color: '#B7B7B8' }}>›</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: currentJourney.color.accent }}>
                {currentJourney.emoji} {currentJourney.name}
              </span>
              <span style={{ color: '#B7B7B8' }}>›</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e' }}>
                {currentStage.emoji} {currentStage.name}
              </span>
            </>
          )}
        </div>

        {/* Content */}
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
            onActorSelect={setSelectedActor}
          />
        )}
      </main>
    </div>
  )
}
