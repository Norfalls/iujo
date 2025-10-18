import * as React from 'react';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classNames from 'classnames'; // Install with: npm install classnames

// Styles (you can put this in a separate CSS file, e.g., StudentForm.module.css or global styles)
const styles = `
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto; // 4 columns for fields + photo column
  gap: 16px;
  align-items: start;
}

.photo {
  grid-column: 5;
  grid-row: 1 / 3; // Span first two rows
  width: 150px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 13px;
  line-height: 1;
  height: 35px;
  gap: 5px;
  background-color: white;
  outline: none;
}

.select-content {
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.select-viewport {
  padding: 5px;
}

.select-item {
  font-size: 13px;
  line-height: 1;
  color: violet;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;
}

.select-item[data-disabled] {
  color: gray;
  pointer-events: none;
}

.select-item[data-highlighted] {
  outline: none;
  background-color: violet;
  color: white;
}

.select-label {
  padding: 0 25px;
  font-size: 12px;
  line-height: 25px;
  color: gray;
}

.select-separator {
  height: 1px;
  background-color: #ccc;
  margin: 5px;
}

.select-item-indicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.select-scroll-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  background-color: white;
  color: violet;
  cursor: default;
}

.button {
  padding: 8px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
`;

// Inject styles (for demo; in real app, use CSS modules or styled-jsx)
const styleSheet = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleSheet) {
  styleSheet.innerHTML = styles;
  document.head.appendChild(styleSheet);
}

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classNames('select-item', className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="select-item-indicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = 'SelectItem';

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    expediente: '18991',
    cedula: 'V-29896532',
    sexo: 'Masculino',
    edoCivil: 'Soltero',
    nombre1: 'Daniel',
    nombre2: 'Eduardo',
    apellido1: 'Araujo',
    apellido2: 'Marcano',
    direccion: 'Sucre Urbanizacion Pedro Elias Gutierrez Casalta 2 Edificio 3 Piso 12 Apartamento1203',
    telefono: '0424 1611520',
    email: 'dasharaujo22@gmail.com',
    lugarNacimiento: 'Miranda Sucre',
    fechaNacimiento: '22-01-2003',
    discapacidad: 'Ninguna',
    anoGraduacion: '2020',
    plantelProcedencia: 'UE C El Salvador',
    estudioFyA: false,
    codigoRUSNIEU: '58735994609',
    etniaIndigena: 'No aplica',
    photoUrl: '/placeholder-photo.jpg', // Replace with actual photo URL or upload logic
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would integrate with Prisma to save data
  };

  return (
    <form onSubmit={handleSubmit} className="grid-container">
      {/* First row */}
      <div>
        <Label htmlFor="expediente">Expediente</Label>
        <input
          id="expediente"
          name="expediente"
          value={formData.expediente}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div>
        <Label htmlFor="cedula">Cédula*</Label>
        <input
          id="cedula"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <Label htmlFor="sexo">Sexo</Label>
        <Select.Root value={formData.sexo} onValueChange={handleSelectChange('sexo')}>
          <Select.Trigger className="select-trigger">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content">
              <Select.ScrollUpButton className="select-scroll-button">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="select-viewport">
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Femenino">Femenino</SelectItem>
                {/* Add more options as needed */}
              </Select.Viewport>
              <Select.ScrollDownButton className="select-scroll-button">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div>
        <Label htmlFor="edoCivil">Edo. Civil</Label>
        <Select.Root value={formData.edoCivil} onValueChange={handleSelectChange('edoCivil')}>
          <Select.Trigger className="select-trigger">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content">
              <Select.ScrollUpButton className="select-scroll-button">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="select-viewport">
                <SelectItem value="Soltero">Soltero</SelectItem>
                <SelectItem value="Casado">Casado</SelectItem>
                {/* Add more */}
              </Select.Viewport>
              <Select.ScrollDownButton className="select-scroll-button">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Photo next to first two rows */}
      <img src={formData.photoUrl} alt="Fotografía" className="photo" />

      {/* Second row */}
      <div>
        <Label htmlFor="nombre1">Nombre 1*</Label>
        <input
          id="nombre1"
          name="nombre1"
          value={formData.nombre1}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <Label htmlFor="nombre2">Nombre 2</Label>
        <input
          id="nombre2"
          name="nombre2"
          value={formData.nombre2}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div>
        <Label htmlFor="apellido1">Apellido 1*</Label>
        <input
          id="apellido1"
          name="apellido1"
          value={formData.apellido1}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <Label htmlFor="apellido2">Apellido 2</Label>
        <input
          id="apellido2"
          name="apellido2"
          value={formData.apellido2}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Third row - Dirección (spans multiple columns if needed, but here full width) */}
      <div style={{ gridColumn: '1 / 5' }}>
        <Label htmlFor="direccion">Dirección*</Label>
        <input
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      {/* More fields - adjust grid as needed */}
      <div>
        <Label htmlFor="telefono">Teléfono*</Label>
        <input
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div style={{ gridColumn: '2 / 5' }}>
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div>
        <Label htmlFor="lugarNacimiento">Lugar nacimiento*</Label>
        <input
          id="lugarNacimiento"
          name="lugarNacimiento"
          value={formData.lugarNacimiento}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div>
        <Label htmlFor="fechaNacimiento">Fecha nacimiento</Label>
        <input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date" // Or text if format specific
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div>
        <Label htmlFor="discapacidad">Discapacidad</Label>
        <Select.Root value={formData.discapacidad} onValueChange={handleSelectChange('discapacidad')}>
          <Select.Trigger className="select-trigger">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content">
              <Select.ScrollUpButton className="select-scroll-button">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="select-viewport">
                <SelectItem value="Ninguna">Ninguna</SelectItem>
                {/* Add more options */}
              </Select.Viewport>
              <Select.ScrollDownButton className="select-scroll-button">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div />

      <div>
        <Label htmlFor="anoGraduacion">Año graduación*</Label>
        <input
          id="anoGraduacion"
          name="anoGraduacion"
          value={formData.anoGraduacion}
          onChange={handleChange}
          className="input"
          required
        />
      </div>
      <div style={{ gridColumn: '2 / 5' }}>
        <Label htmlFor="plantelProcedencia">Plantel de procedencia</Label>
        <input
          id="plantelProcedencia"
          name="plantelProcedencia"
          value={formData.plantelProcedencia}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div>
        <Label htmlFor="estudioFyA">¿Estudió en FyA?</Label>
        <input
          id="estudioFyA"
          name="estudioFyA"
          type="checkbox"
          checked={formData.estudioFyA}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="codigoRUSNIEU">Código RUSNIEU</Label>
        <input
          id="codigoRUSNIEU"
          name="codigoRUSNIEU"
          value={formData.codigoRUSNIEU}
          onChange={handleChange}
          className="input"
        />
      </div>
      <div>
        <Label htmlFor="etniaIndigena">Pertenece a etnia indígena</Label>
        <Select.Root value={formData.etniaIndigena} onValueChange={handleSelectChange('etniaIndigena')}>
          <Select.Trigger className="select-trigger">
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content">
              <Select.ScrollUpButton className="select-scroll-button">
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className="select-viewport">
                <SelectItem value="No aplica">No aplica</SelectItem>
                {/* Add more */}
              </Select.Viewport>
              <Select.ScrollDownButton className="select-scroll-button">
                <ChevronDownIcon />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div />

      {/* Buttons */}
      <div style={{ gridColumn: '4 / 6', justifySelf: 'end' }}>
        <button type="button" className="button" style={{ marginRight: '8px' }}>
          Cambios
        </button>
        <button type="submit" className="button">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default StudentForm;