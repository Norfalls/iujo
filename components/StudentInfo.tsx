import * as React from 'react';
import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from '@/styles/StudentInfo.module.css'
import { Separator } from '@/components/ui/separator'; // Use the styled wrapper from your UI components (better for consistency with app theme)

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
    <form onSubmit={handleSubmit} className={styles['grid-container']}>
      {/* First row */}
      <div>
        <Label htmlFor="expediente">Expediente</Label>
        <input
          id="expediente"
          name="expediente"
          value={formData.expediente}
          onChange={handleChange}
          className={styles['input']}
        />
      </div>
      <div>
        <Label htmlFor="cedula">Cédula*</Label>
        <input
          id="cedula"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          className={styles['input']}
          required
        />
      </div>
      <div>
        <Label htmlFor="sexo">Sexo</Label>
        <Select.Root value={formData.sexo} onValueChange={handleSelectChange('sexo')}>
          <Select.Trigger className={styles['select-trigger']}>
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className={styles['select-icon']} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={styles['select-content']}>
              <Select.ScrollUpButton className={styles['select-scroll-button']}>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className={styles['select-viewport']}>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Femenino">Femenino</SelectItem>
                {/* Add more options as needed */}
              </Select.Viewport>
              <Select.ScrollDownButton className={styles['select-scroll-button']}>
                <ChevronDownIcon className={styles['select-icon']} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div>
        <Label htmlFor="edoCivil">Edo. Civil</Label>
        <Select.Root value={formData.edoCivil} onValueChange={handleSelectChange('edoCivil')}>
          <Select.Trigger className={styles['select-trigger']}>
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className={styles['select-icon']} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={styles['select-content']}>
              <Select.ScrollUpButton className={styles['select-scroll-button']}>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className={styles['select-viewport']}>
                <SelectItem value="Soltero">Soltero</SelectItem>
                <SelectItem value="Casado">Casado</SelectItem>
                {/* Add more */}
              </Select.Viewport>
              <Select.ScrollDownButton className={styles['select-scroll-button']}>
                <ChevronDownIcon className={styles['select-icon']} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Photo next to first two rows */}
      <img src={formData.photoUrl} alt="Fotografía" className={styles['photo']} />

      {/* Second row */}
      <div>
        <Label htmlFor="nombre1">Nombre 1*</Label>
        <input
          id="nombre1"
          name="nombre1"
          value={formData.nombre1}
          onChange={handleChange}
          className={styles['input']}
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
          className={styles['input']}
        />
      </div>
      <div>
        <Label htmlFor="apellido1">Apellido 1*</Label>
        <input
          id="apellido1"
          name="apellido1"
          value={formData.apellido1}
          onChange={handleChange}
          className={styles['input']}
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
          className={styles['input']}
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
          className={styles['input']}
          required
        />
      </div>

      {/* More fields - adjust grid as needed */}
      <div style={{ gridColumn: '1 / 2' }}>
        <Label htmlFor="telefono">Teléfono*</Label>
        <input
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className={styles['input']}
          required
        />
      </div>
      <div style={{ gridColumn: '2 / 4' }}>
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={styles['input']}
        />
      </div>

      <div style={{ gridColumn: '1 / 3' }}>
        <Label htmlFor="lugarNacimiento">Lugar nacimiento*</Label>
        <input
          id="lugarNacimiento"
          name="lugarNacimiento"
          value={formData.lugarNacimiento}
          onChange={handleChange}
          className={styles['input']}
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
          className={styles['input']}
        />
      </div>
      <div>
        <Label htmlFor="discapacidad">Discapacidad</Label>
        <Select.Root value={formData.discapacidad} onValueChange={handleSelectChange('discapacidad')}>
          <Select.Trigger className={styles['select-trigger']}>
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className={styles['select-icon']} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={styles['select-content']}>
              <Select.ScrollUpButton className={styles['select-scroll-button']}>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className={styles['select-viewport']}>
                <SelectItem value="Ninguna">Ninguna</SelectItem>
                {/* Add more options */}
              </Select.Viewport>
              <Select.ScrollDownButton className={styles['select-scroll-button']}>
                <ChevronDownIcon className={styles['select-icon']} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div />

      <div>
        <Label htmlFor="etniaIndigena">Pertenece a etnia indígena</Label>
        <Select.Root value={formData.etniaIndigena} onValueChange={handleSelectChange('etniaIndigena')}>
          <Select.Trigger className={styles['select-trigger']}>
            <Select.Value />
            <Select.Icon>
              <ChevronDownIcon className={styles['select-icon']} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={styles['select-content']}>
              <Select.ScrollUpButton className={styles['select-scroll-button']}>
                <ChevronUpIcon />
              </Select.ScrollUpButton>
              <Select.Viewport className={styles['select-viewport']}>
                <SelectItem value="No aplica">No aplica</SelectItem>
                {/* Add more */}
              </Select.Viewport>
              <Select.ScrollDownButton className={styles['select-scroll-button']}>
                <ChevronDownIcon className={styles['select-icon']} />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div>
        <Label htmlFor="anoGraduacion">Año graduación*</Label>
        <input
          id="anoGraduacion"
          name="anoGraduacion"
          value={formData.anoGraduacion}
          onChange={handleChange}
          className={styles['input']}
          required
        />
      </div>
      <div style={{ gridColumn: '3 / 5' }}>
        <Label htmlFor="plantelProcedencia">Plantel de procedencia</Label>
        <input
          id="plantelProcedencia"
          name="plantelProcedencia"
          value={formData.plantelProcedencia}
          onChange={handleChange}
          className={styles['input']}
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
          className='inline-flex'
        />
      </div>

      <div>
        <Label htmlFor="codigoRUSNIEU">Código RUSNIEU</Label>
        <input
          id="codigoRUSNIEU"
          name="codigoRUSNIEU"
          value={formData.codigoRUSNIEU}
          onChange={handleChange}
          className={styles['input']}
        />
      </div>
      <div />


      {/* Buttons */}
      <Separator style={{ gridColumn: '1 / 6'}} orientation="horizontal"/>
      <div style={{ gridColumn: '1 / 6', justifySelf: 'end' }}>
        <button type="button" className={styles['button']} style={{ marginRight: '8px' }}>
          Cambios
        </button>
        <button type="submit" className={styles['button']}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default StudentForm;