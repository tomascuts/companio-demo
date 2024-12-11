import { ShoppingCart, Pets } from '@mui/icons-material';

export const requests = [
  {
    _id: 1,
    providerId: 3,
    providerName: "Fernando López",
    requests: [
      {
        services: "Supermercado",
        assisted: "Mario Keen",
        date: "2024-09-10",
        state: "Completed",
        paymentDescription: "Pagado en efectivo",
        icon: <ShoppingCart />
      },
      {
        services: "Mascotas",
        assisted: "Ricardo Rodríguez",
        date: null,
        state: "In Progress",
        paymentDescription: null,
        icon: <Pets />
      },
      {
        services: "Mascotas",
        assisted: "Otto Gomez",
        date: null,
        state: "Pending",
        paymentDescription: null,
        icon: <Pets />
      }
    ]
  }]
