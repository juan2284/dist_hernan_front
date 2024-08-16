import { FieldErrors, UseFormRegister } from "react-hook-form"
import { ClientFormData } from "../types"
import ErrorMessage from "./ErrorMessage";
import { useLocation } from "react-router-dom";

type ClientFormProps = {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
}

export default function ClientForm({errors, register}: ClientFormProps) {
  const location = useLocation();
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre:
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Cliente"
          {...register("name", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="last_name" className="text-sm uppercase font-bold">
          Apellido:
        </label>
        <input
          id="last_name"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Apellido del Cliente"
          {...register("last_name", {
            required: "El Apellido del Cliente es obligatorio",
          })}
        />

        {errors.last_name && (
          <ErrorMessage>{errors.last_name.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="telephone" className="text-sm uppercase font-bold">
          Teléfono:
        </label>
        <input
          id="telephone"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Teléfono del Cliente"
          {...register("telephone", {
            required: "El Teléfono del Cliente es obligatorio",
          })}
        />

        {errors.telephone && (
          <ErrorMessage>{errors.telephone.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="vehicle" className="text-sm uppercase font-bold">
          Vehículo:
        </label>
        <input
          id="vehicle"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Marca del Vehículo"
          {...register("vehicle", {
            required: "La Marca del Vehículo es obligatoria",
          })}
        />

        {errors.vehicle && (
          <ErrorMessage>{errors.vehicle.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="type_oil" className="text-sm uppercase font-bold">
          Tipo de Aceite:
        </label>
        <input
          id="type_oil"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Tipo de Aceite"
          {...register("type_oil", {
            required: "El tipo de Aceite es obligatorio",
          })}
        />

        {errors.type_oil && (
          <ErrorMessage>{errors.type_oil.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="brand_oil" className="text-sm uppercase font-bold">
          Marca del Aceite:
        </label>
        <input
          id="brand_oil"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Marca del Aceite"
          {...register("brand_oil", {
            required: "La Marca del Aceite es obligatoria",
          })}
        />

        {errors.brand_oil && (
          <ErrorMessage>{errors.brand_oil.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="filter" className="text-sm uppercase font-bold">
          Filtro:
        </label>
        <input
          id="filter"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Filtro"
          {...register("filter", {
            required: "El filtro es obligatorio",
          })}
        />

        {errors.filter && (
          <ErrorMessage>{errors.filter.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="mileage" className="text-sm uppercase font-bold">
          Kilometraje:
        </label>
        <input
          id="mileage"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Kilometraje del Vehículo"
          {...register("mileage", {
            required: "El kilometraje es obligatorio",
          })}
        />

        {errors.mileage && (
          <ErrorMessage>{errors.mileage.message}</ErrorMessage>
        )}
      </div>

      { location.pathname === '/clients/create' && (
        <div className="mb-5 space-y-3">
          <label htmlFor="service_date" className="text-sm uppercase font-bold">
            Fecha del Servicio:
          </label>
          <input
            id="service_date"
            className="w-full p-3  border border-gray-200"
            type="date"
            placeholder="Kilometraje del Vehículo"
            {...register("service_date", {
              required: "La fecha del servicio es obligatoria",
            })}
          />

          {errors.service_date && (
            <ErrorMessage>{errors.service_date.message}</ErrorMessage>
          )}
        </div>
      )}
    </>
  )
}
