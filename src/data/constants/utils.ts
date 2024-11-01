import { STATUS_SERVICE_ORDER } from "@/pages/ServiceOrder/types";

export const SO_STATUS_LIST: {value: STATUS_SERVICE_ORDER, label: string, color: string, linked?: STATUS_SERVICE_ORDER[]}[] = [
    {
        value: STATUS_SERVICE_ORDER.PENDING,
        label: 'Em aberto',
        color: 'bg-zinc-400',
        linked: [STATUS_SERVICE_ORDER.WAITING_APPROVAL, STATUS_SERVICE_ORDER.SCHEDULED, STATUS_SERVICE_ORDER.REJECTED]
    },{
        value: STATUS_SERVICE_ORDER.WAITING_APPROVAL,
        label: 'Enviado ao cliente',
        color: 'bg-violet-500',
        linked: [STATUS_SERVICE_ORDER.APPROVED, STATUS_SERVICE_ORDER.REJECTED, STATUS_SERVICE_ORDER.PENDING]
    },{
        value: STATUS_SERVICE_ORDER.APPROVED,
        label: 'Aprovado',
        color: 'bg-green-600',
        linked: [STATUS_SERVICE_ORDER.SCHEDULED, STATUS_SERVICE_ORDER.DOING]
    },{
        value: STATUS_SERVICE_ORDER.SCHEDULED,
        label: 'Agendado',
        color: 'bg-amber-500',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.TODO,
        label: 'Na oficina',
        color: 'bg-amber-500',
        linked: [STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.DOING,
        label: 'Executando',
        color: 'bg-green-500',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.READY,
        label: 'Pronto',
        color: 'bg-green-500',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.BLOCKED, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.DONE,
        label: 'Entregue',
        color: 'bg-zinc-900',
        linked: [STATUS_SERVICE_ORDER.PENDING]
    },{
        value: STATUS_SERVICE_ORDER.BLOCKED,
        label: 'Bloqueado',
        color: 'bg-red-400',
        linked: [STATUS_SERVICE_ORDER.TODO, STATUS_SERVICE_ORDER.DOING, STATUS_SERVICE_ORDER.READY, STATUS_SERVICE_ORDER.DONE]
    },{
        value: STATUS_SERVICE_ORDER.CANCELLED,
        label: 'Cancelado',
        color: 'bg-red-500'
    },{
        value: STATUS_SERVICE_ORDER.REJECTED,
        label: 'Rejeitado',
        color: 'bg-zinc-400',
        linked: [STATUS_SERVICE_ORDER.PENDING]
    }
]

export const PAGE_LIMIT = 15

export const USE_QUERY_CONFIGS = {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    initialPageParam: 1
}

export const CAR_SERVICES = [
    { "value": "BODYWORK", "label": "Funilaria", "color": "bg-blue-500" },
    { "value": "PAINTING", "label": "Pintura", "color": "bg-violet-500" },
    { "value": "PARTS", "label": "Peças", "color": "bg-amber-500" },
    { "value": "AIR_CONDITIONING", "label": "Ar Condicionado", "color": "bg-indigo-300" },
    { "value": "TIRE_REPAIR", "label": "Borracharia", "color": "bg-gray-500" },
    { "value": "ELECTRICAL", "label": "Elétrica", "color": "bg-pink-500" },
    { "value": "AESTHETICS", "label": "Estética", "color": "bg-pink-400" },
    { "value": "DENT_REPAIR", "label": "Martelinho", "color": "bg-blue-400" },
    { "value": "MECHANICAL", "label": "Mecânica", "color": "bg-green-500" },
    { "value": "OVERHAUL", "label": "Revisão", "color": "bg-red-400" },
    { "value": "UPHOLSTERY", "label": "Tapeçaria", "color": "bg-amber-700" },
    { "value": "GLASSWORK", "label": "Vidraçaria", "color": "bg-blue-300" },
    { "value": "OTHER", "label": "Outros", "color": "bg-pink-800" }
]
