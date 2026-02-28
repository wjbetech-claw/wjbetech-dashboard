import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState } from 'react';
import { DndContext, DragOverlay, PointerSensor, KeyboardSensor, useDroppable, useSensor, useSensors, } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const STORAGE_KEY = 'wjb_kanban_v4';
const DEFAULT_COLS = [
    { id: 'todo', title: 'Backlog', color: '#EEF2FF', icon: '🧠', cards: [{ id: 'c1', title: 'Design dashboard polish', description: 'Refine spacing + cards', tags: ['UI', 'Design'], assignees: ['Ari'], updatedAt: 'Just now' }] },
    { id: 'doing', title: 'In Progress', color: '#ECFEFF', icon: '⚙️', cards: [{ id: 'c2', title: 'CI workflow tweaks', description: 'Ensure tests are green', tags: ['CI'], assignees: ['Devon'], updatedAt: '2h ago' }] },
    { id: 'review', title: 'Review', color: '#FFF7ED', icon: '🔍', cards: [] },
    { id: 'done', title: 'Done', color: '#ECFDF5', icon: '✅', cards: [{ id: 'c3', title: 'Navbar links', description: 'Board/Jobs links', tags: ['UI'], assignees: ['Mina'], updatedAt: 'Yesterday' }] },
];
function KanbanCard({ card, isDragging, onDelete }) {
    return (_jsxs("div", { style: {
            padding: 12,
            background: 'var(--panel)',
            borderRadius: 12,
            border: '1px solid var(--border)',
            cursor: isDragging ? 'grabbing' : 'grab',
            boxShadow: '0 6px 16px rgba(15,23,42,0.08)',
            opacity: isDragging ? 0.7 : 1,
        }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }, children: [_jsx("div", { style: { fontWeight: 600 }, children: card.title }), _jsx("button", { className: 'cursor-pointer', onClick: onDelete, style: { border: '1px solid var(--border)', borderRadius: 8, background: 'transparent', padding: '2px 6px', fontSize: 12 }, children: "\uD83D\uDDD1\uFE0F" })] }), card.description ? _jsx("div", { style: { fontSize: 12, opacity: 0.7, marginTop: 4 }, children: card.description }) : null, card.tags ? (_jsx("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }, children: card.tags.map(t => (_jsx("span", { style: { fontSize: 11, padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 999 }, children: t }, t))) })) : null, card.assignees ? (_jsx("div", { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }, children: card.assignees.map(a => (_jsx("span", { style: { fontSize: 11, padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 999, background: 'var(--panel)' }, children: a }, a))) })) : null, card.updatedAt ? _jsxs("div", { style: { fontSize: 11, opacity: 0.6, marginTop: 6 }, children: ["Updated ", card.updatedAt] }) : null] }));
}
export default function Kanban() {
    const [cols, setCols] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw)
                return JSON.parse(raw);
        }
        catch (e) { }
        return DEFAULT_COLS;
    });
    const [isOpen, setIsOpen] = useState(false);
    const [draftTitle, setDraftTitle] = useState('');
    const [draftDesc, setDraftDesc] = useState('');
    const [draftCol, setDraftCol] = useState(cols[0]?.id || 'todo');
    const inputRef = React.useRef(null);
    const [activeCard, setActiveCard] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
    useEffect(() => {
        if (!isOpen)
            return;
        function onKey(e) {
            if (e.key === 'Escape')
                setIsOpen(false);
            if (e.key === 'Tab') {
                const focusables = Array.from(document.querySelectorAll("[data-modal='kanban'] button, [data-modal='kanban'] input, [data-modal='kanban'] select, [data-modal='kanban'] textarea"));
                if (focusables.length === 0)
                    return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
        window.addEventListener('keydown', onKey);
        inputRef.current?.focus();
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);
    function persist(next) {
        setCols(next);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
        catch (e) { }
    }
    function addCard() {
        const title = draftTitle.trim();
        if (!title)
            return;
        const next = cols.map(c => ({ ...c, cards: [...c.cards] }));
        const dst = next.find(c => c.id === draftCol);
        if (!dst)
            return;
        dst.cards.unshift({ id: `c_${Date.now()}`, title, description: draftDesc.trim() || undefined });
        persist(next);
        setDraftTitle('');
        setDraftDesc('');
        setIsOpen(false);
    }
    function deleteCard(colId, cardId) {
        const next = cols.map(c => ({ ...c, cards: [...c.cards] }));
        const dst = next.find(c => c.id === colId);
        if (!dst)
            return;
        dst.cards = dst.cards.filter(c => c.id !== cardId);
        persist(next);
    }
    const columnIds = useMemo(() => cols.map(c => c.id), [cols]);
    function findCard(cardId) {
        for (const col of cols) {
            const card = col.cards.find(c => c.id === cardId);
            if (card)
                return { card, col };
        }
        return null;
    }
    function onDragStart(event) {
        const cardId = event.active.id;
        const found = findCard(cardId);
        if (found)
            setActiveCard(found.card);
    }
    function onDragEnd(event) {
        const { active, over } = event;
        setActiveCard(null);
        if (!over)
            return;
        const activeId = active.id;
        const overId = over.id;
        const from = findCard(activeId);
        if (!from)
            return;
        if (columnIds.includes(overId)) {
            const next = cols.map(c => ({ ...c, cards: [...c.cards] }));
            const src = next.find(c => c.id === from.col.id);
            const dst = next.find(c => c.id === overId);
            if (!src || !dst)
                return;
            src.cards = src.cards.filter(c => c.id !== activeId);
            dst.cards.push(from.card);
            persist(next);
            return;
        }
        const target = findCard(overId);
        if (!target)
            return;
        const next = cols.map(c => ({ ...c, cards: [...c.cards] }));
        const src = next.find(c => c.id === from.col.id);
        const dst = next.find(c => c.id === target.col.id);
        if (!src || !dst)
            return;
        src.cards = src.cards.filter(c => c.id !== activeId);
        const targetIndex = dst.cards.findIndex(c => c.id === overId);
        if (targetIndex === -1)
            return;
        dst.cards.splice(targetIndex, 0, from.card);
        persist(next);
    }
    return (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, children: [_jsx("div", { style: { fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }, children: "\uD83D\uDDC2\uFE0F Kanban board" }), _jsx("button", { className: 'cursor-pointer', "aria-label": 'Add task', onClick: () => setIsOpen(true), style: { padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--panel)' }, children: "+ Add task" })] }), _jsxs(DndContext, { sensors: sensors, onDragStart: onDragStart, onDragEnd: onDragEnd, children: [_jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }, "data-testid": "kanban-root", children: cols.map(col => (_jsx(KanbanColumn, { col: col, children: _jsx(SortableContext, { items: col.cards.map(c => c.id), strategy: verticalListSortingStrategy, children: _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 10, minHeight: 80 }, children: col.cards.length === 0 ? (_jsx("div", { style: { fontSize: 12, opacity: 0.7 }, children: "No tasks yet" })) : col.cards.map(card => (_jsx(SortableCard, { id: card.id, card: card, colId: col.id, onDelete: deleteCard }, card.id))) }) }) }, col.id))) }), _jsx(DragOverlay, { children: activeCard ? _jsx(KanbanCard, { card: activeCard, isDragging: true }) : null })] }), isOpen ? (_jsx("div", { style: { position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }, role: "dialog", "aria-modal": "true", "aria-label": "Add new task", children: _jsxs("div", { "data-modal": 'kanban', style: { background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, width: 'min(520px,90vw)', boxShadow: '0 20px 40px rgba(15,23,42,0.25)' }, children: [_jsx("div", { style: { fontWeight: 700, fontSize: 16, marginBottom: 6 }, children: "Add new task" }), _jsx("div", { style: { fontSize: 12, opacity: 0.7, marginBottom: 12 }, children: "Choose a list and add details." }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: [_jsx("input", { ref: inputRef, value: draftTitle, onChange: (e) => setDraftTitle(e.target.value), placeholder: 'Task title', style: { padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 10, background: 'transparent' } }), _jsx("textarea", { value: draftDesc, onChange: (e) => setDraftDesc(e.target.value), placeholder: 'Description (optional)', rows: 3, style: { padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 10, background: 'transparent' } }), _jsx("select", { value: draftCol, onChange: (e) => setDraftCol(e.target.value), style: { padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 10, background: 'transparent' }, children: cols.map(c => (_jsx("option", { value: c.id, children: c.title }, c.id))) })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }, children: [_jsx("button", { className: 'cursor-pointer', onClick: () => setIsOpen(false), style: { padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 10, background: 'transparent' }, children: "Cancel" }), _jsx("button", { className: 'cursor-pointer', onClick: addCard, style: { padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--panel)' }, children: "Add task" })] })] }) })) : null] }));
}
function SortableCard({ id, card, colId, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (_jsx("div", { ref: setNodeRef, style: { ...style, opacity: isDragging ? 0.2 : 1 }, ...attributes, ...listeners, children: _jsx(KanbanCard, { card: card, isDragging: isDragging, onDelete: () => onDelete(colId, card.id) }) }));
}
function KanbanColumn({ col, children }) {
    const { setNodeRef } = useDroppable({ id: col.id });
    return (_jsxs("div", { ref: setNodeRef, style: { background: col.color, padding: 12, borderRadius: 14, border: '1px solid var(--border)', boxShadow: '0 10px 24px rgba(15,23,42,0.06)' }, id: col.id, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, children: [_jsxs("h3", { style: { margin: 0, fontSize: 14, letterSpacing: '0.4px', display: 'flex', alignItems: 'center', gap: 6 }, children: [col.icon, " ", col.title] }), _jsx("span", { style: { fontSize: 12, opacity: 0.7 }, children: col.cards.length })] }), children] }));
}
//# sourceMappingURL=Kanban.js.map