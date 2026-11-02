import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleHelp,
  Info,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { contact, getWhatsAppUrl, services } from '../../data/site'
import { formatLongDate, getTodayISO, isValidMexicanPhone } from '../../lib/format'
import { ServiceGlyph } from '../ui/ServiceGlyph'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import './AppointmentForm.css'

type PreferredPeriod = '' | 'manana' | 'tarde' | 'sin-preferencia'

type FormValues = {
  serviceId: string
  preferredDate: string
  preferredPeriod: PreferredPeriod
  fullName: string
  phone: string
  email: string
  consent: boolean
}

type ErrorField =
  | 'serviceId'
  | 'preferredDate'
  | 'preferredPeriod'
  | 'fullName'
  | 'phone'
  | 'email'
  | 'consent'

type FormErrors = Partial<Record<ErrorField, string>>

const consultationOptions = [
  ...services.map((service) => ({
    id: service.id,
    title: service.title,
    summary: service.summary,
    icon: service.icon,
  })),
  {
    id: 'orientacion',
    title: 'Quiero orientación',
    summary: 'Aún no estoy segura de qué tipo de consulta elegir.',
    icon: null,
  },
]

const periods: { value: Exclude<PreferredPeriod, ''>; label: string }[] = [
  { value: 'manana', label: 'Por la mañana' },
  { value: 'tarde', label: 'Por la tarde' },
  { value: 'sin-preferencia', label: 'Sin preferencia' },
]

const periodLabels: Record<Exclude<PreferredPeriod, ''>, string> = {
  manana: 'Por la mañana',
  tarde: 'Por la tarde',
  'sin-preferencia': 'Sin preferencia',
}

const steps = [
  { number: 1, label: 'Tipo de consulta' },
  { number: 2, label: 'Fecha y preferencia' },
  { number: 3, label: 'Datos de contacto' },
  { number: 4, label: 'Revisión y envío' },
]

const initialValues: FormValues = {
  serviceId: '',
  preferredDate: '',
  preferredPeriod: '',
  fullName: '',
  phone: '',
  email: '',
  consent: false,
}

function getInitialService() {
  const preselected = sessionStorage.getItem('dcm-appointment-service')
  if (preselected && consultationOptions.some((option) => option.id === preselected)) {
    return preselected
  }
  return ''
}

export function AppointmentForm() {
  const location = useLocation()
  const preselectedService = (location.state as { serviceId?: string } | null)?.serviceId
  const [values, setValues] = useState<FormValues>(() => ({
    ...initialValues,
    serviceId:
      preselectedService && consultationOptions.some((option) => option.id === preselectedService)
        ? preselectedService
        : getInitialService(),
  }))
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [whatsAppUrl, setWhatsAppUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const statusRef = useRef<HTMLHeadingElement>(null)
  const hasMounted = useRef(false)

  const selectedService = consultationOptions.find(
    (option) => option.id === values.serviceId,
  )

  const currentPeriod = values.preferredPeriod
    ? periodLabels[values.preferredPeriod]
    : 'Sin definir'

  useEffect(() => {
    if (selectedService?.id) {
      sessionStorage.setItem('dcm-appointment-service', selectedService.id)
    }
  }, [selectedService?.id])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    if (submitted) {
      statusRef.current?.focus({ preventScroll: true })
      const formCard = statusRef.current?.closest<HTMLElement>('.appointment-form')
      window.requestAnimationFrame(() => {
        if (!formCard) return
        const header = document.querySelector<HTMLElement>('.site-header')
        const offset = (header?.offsetHeight ?? 82) + 22
        const top = formCard.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({
          top,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      })
    } else {
      stepHeadingRef.current?.focus()
    }
  }, [step, submitted])

  function updateValue<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => {
      if (!previous[field as ErrorField]) return previous
      const next = { ...previous }
      delete next[field as ErrorField]
      return next
    })
  }

  function validateStep(currentStep: number) {
    const nextErrors: FormErrors = {}

    if (currentStep === 1 && !values.serviceId) {
      nextErrors.serviceId = 'Selecciona el tipo de consulta que te interesa.'
    }

    if (currentStep === 2) {
      if (!values.preferredDate) {
        nextErrors.preferredDate = 'Indica una fecha de preferencia.'
      } else if (
        !/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate) ||
        Number.isNaN(new Date(`${values.preferredDate}T12:00:00`).getTime())
      ) {
        nextErrors.preferredDate = 'Ingresa una fecha válida.'
      } else if (values.preferredDate < getTodayISO()) {
        nextErrors.preferredDate = 'La fecha debe ser hoy o una fecha posterior.'
      }

      if (!values.preferredPeriod) {
        nextErrors.preferredPeriod = 'Selecciona una preferencia horaria.'
      }
    }

    if (currentStep === 3) {
      if (values.fullName.trim().length < 3) {
        nextErrors.fullName = 'Ingresa tu nombre completo.'
      }

      if (!values.phone.trim()) {
        nextErrors.phone = 'Ingresa un número de teléfono.'
      } else if (!isValidMexicanPhone(values.phone)) {
        nextErrors.phone = 'Ingresa un teléfono de 10 dígitos.'
      }

      if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        nextErrors.email = 'Ingresa un correo electrónico válido.'
      }

      if (!values.consent) {
        nextErrors.consent = 'Necesitamos tu consentimiento para continuar.'
      }
    }

    return nextErrors
  }

  function focusFirstError(nextErrors: FormErrors) {
    const firstField = Object.keys(nextErrors)[0] as ErrorField | undefined
    if (!firstField) return

    window.requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus()
    })
  }

  function handleNext(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateStep(step)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      focusFirstError(nextErrors)
      return
    }

    setErrors({})
    setStep((current) => Math.min(4, current + 1))
  }

  function handleBack() {
    setErrors({})
    setStep((current) => Math.max(1, current - 1))
  }

  function buildMessage() {
    const lines = [
      'Hola, me gustaría solicitar una cita con la Dra. Claudia Magally Ramírez García.',
      '',
      `Nombre: ${values.fullName.trim()}`,
      `Teléfono: ${values.phone.trim()}`,
    ]

    if (values.email.trim()) {
      lines.push(`Correo: ${values.email.trim()}`)
    }

    lines.push(
      `Tipo de consulta: ${selectedService?.title ?? 'Por definir'}`,
      `Fecha preferida: ${formatLongDate(values.preferredDate)}`,
      `Preferencia horaria: ${currentPeriod}`,
      '',
      'Entiendo que la cita queda pendiente de confirmación por el consultorio.',
    )

    return lines.join('\n')
  }

  function handleSubmit() {
    const url = getWhatsAppUrl(buildMessage())
    setWhatsAppUrl(url)
    setSubmitted(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  function handleEdit(targetStep: number) {
    setSubmitted(false)
    setStep(targetStep)
  }

  function handleRestart() {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
    setStep(1)
    sessionStorage.removeItem('dcm-appointment-service')
  }

  const errorList = Object.values(errors)

  if (submitted) {
    return (
      <div className="appointment-form appointment-form--success">
        <div className="appointment-form__progress" aria-hidden="true">
          <span style={{ width: '100%' }} />
        </div>
        <div className="appointment-success" role="status" aria-live="polite">
          <span className="appointment-success__icon" aria-hidden="true">
            <CheckCircle2 size={34} strokeWidth={1.35} />
          </span>
          <p className="eyebrow">Solicitud preparada</p>
          <h2 ref={statusRef} tabIndex={-1}>
            Tu solicitud está lista para enviarse.
          </h2>
          <p className="appointment-success__lead">
            {whatsAppUrl
              ? 'Abrimos WhatsApp con un mensaje prellenado. Para que el consultorio reciba tu solicitud, presiona el botón de enviar dentro de WhatsApp.'
              : 'Tu mensaje está listo. Ábrelo en WhatsApp para que el consultorio reciba tu solicitud.'}
          </p>

          <div className="appointment-success__status">
            <span className="appointment-success__status-dot" aria-hidden="true" />
            <div>
              <strong>Estado: pendiente de confirmación</strong>
              <p>
                No se ha reservado ningún horario. La cita se confirma cuando el
                consultorio responde por WhatsApp o teléfono.
              </p>
            </div>
          </div>

          <ol className="appointment-success__steps">
            <li>
              <span>01</span>
              Presiona enviar en WhatsApp.
            </li>
            <li>
              <span>02</span>
              El consultorio revisará la disponibilidad.
            </li>
            <li>
              <span>03</span>
              Recibirás la confirmación por ese mismo medio.
            </li>
          </ol>

          <div className="appointment-success__actions">
            <a
              className="btn btn--rose"
              href={whatsAppUrl || getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={19} />
              Abrir WhatsApp
            </a>
            <a className="btn btn--outline" href={contact.phoneHref}>
              <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
              Llamar al consultorio
            </a>
          </div>

          <div className="appointment-success__footer">
            <button type="button" className="text-link" onClick={() => handleEdit(1)}>
              Editar mi solicitud
            </button>
            <button type="button" className="text-link" onClick={handleRestart}>
              Hacer otra solicitud
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="appointment-form">
      <div className="appointment-form__progress" aria-hidden="true">
        <span style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <p className="appointment-form__step-label">
        Paso <strong>{step}</strong> de 4
        <span aria-hidden="true">·</span>
        {steps[step - 1].label}
      </p>

      <form ref={formRef} onSubmit={handleNext} noValidate>
        {errorList.length > 0 ? (
          <div className="appointment-form__error-summary" role="alert">
            <strong>Revisa la información para continuar.</strong>
            <ul>
              {errorList.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {step === 1 ? (
          <fieldset className="appointment-step">
            <legend className="visually-hidden">Tipo de consulta</legend>
            <p className="appointment-form__kicker">Paso 1</p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="appointment-form__title">
              ¿Qué tipo de consulta necesitas?
            </h2>
            <p className="appointment-form__intro">
              Elige el área que mejor describa tu motivo. Si tienes dudas, selecciona
              &quot;Quiero orientación&quot;.
            </p>

            <div
              className="consultation-options"
              aria-describedby={errors.serviceId ? 'service-error' : undefined}
            >
              {consultationOptions.map((option) => (
                <label
                  className={`consultation-option ${
                    values.serviceId === option.id ? 'is-selected' : ''
                  }`.trim()}
                  key={option.id}
                >
                  <input
                    className="consultation-option__input"
                    type="radio"
                    name="serviceId"
                    value={option.id}
                    checked={values.serviceId === option.id}
                    onChange={() => updateValue('serviceId', option.id)}
                    aria-invalid={Boolean(errors.serviceId)}
                    aria-describedby={errors.serviceId ? 'service-error' : undefined}
                  />
                  <span className="consultation-option__icon" aria-hidden="true">
                    {option.icon ? (
                      <ServiceGlyph icon={option.icon} size={22} />
                    ) : (
                      <CircleHelp size={22} strokeWidth={1.4} />
                    )}
                  </span>
                  <span className="consultation-option__copy">
                    <strong>{option.title}</strong>
                    <small>{option.summary}</small>
                  </span>
                  <span className="consultation-option__check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.2} />
                  </span>
                </label>
              ))}
            </div>
            {errors.serviceId ? (
              <p className="field__error" id="service-error">
                {errors.serviceId}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset className="appointment-step">
            <legend className="visually-hidden">Fecha y preferencia horaria</legend>
            <p className="appointment-form__kicker">Paso 2</p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="appointment-form__title">
              ¿Cuándo te gustaría tu cita?
            </h2>
            <p className="appointment-form__intro">
              Indica una fecha y una preferencia horaria. No se muestra disponibilidad en
              tiempo real: el consultorio confirmará el horario contigo.
            </p>

            <div className="appointment-form__fields">
              <div className="field">
                <label className="field__label" htmlFor="preferredDate">
                  Fecha preferida
                </label>
                <input
                  className="field__control field__control--date"
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={getTodayISO()}
                  value={values.preferredDate}
                  onChange={(event) => updateValue('preferredDate', event.target.value)}
                  aria-invalid={Boolean(errors.preferredDate)}
                  aria-describedby={errors.preferredDate ? 'date-error' : 'date-hint'}
                  autoComplete="off"
                />
                <span className="field__hint" id="date-hint">
                  La fecha seleccionada es una preferencia, no una reservación.
                </span>
                {errors.preferredDate ? (
                  <p className="field__error" id="date-error">
                    {errors.preferredDate}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <span className="field__label">Preferencia horaria</span>
                <div
                  className="period-options"
                  role="group"
                  aria-label="Preferencia horaria"
                  aria-invalid={Boolean(errors.preferredPeriod)}
                  aria-describedby={errors.preferredPeriod ? 'period-error' : undefined}
                >
                  {periods.map((period) => (
                    <label
                      className={`period-option ${
                        values.preferredPeriod === period.value ? 'is-selected' : ''
                      }`.trim()}
                      key={period.value}
                    >
                      <input
                        type="radio"
                        name="preferredPeriod"
                        value={period.value}
                        checked={values.preferredPeriod === period.value}
                        onChange={() => updateValue('preferredPeriod', period.value)}
                      />
                      <span>{period.label}</span>
                    </label>
                  ))}
                </div>
                {errors.preferredPeriod ? (
                  <p className="field__error" id="period-error">
                    {errors.preferredPeriod}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="notice appointment-form__notice">
              <Info size={17} strokeWidth={1.6} aria-hidden="true" />
              <p>
                La agenda se confirma directamente con el consultorio. Si necesitas
                atención en una fecha específica, indícalo y continúa por WhatsApp.
              </p>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset className="appointment-step">
            <legend className="visually-hidden">Datos de contacto</legend>
            <p className="appointment-form__kicker">Paso 3</p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="appointment-form__title">
              ¿Cómo podemos contactarte?
            </h2>
            <p className="appointment-form__intro">
              Solo necesitamos datos básicos de contacto para dar seguimiento a tu
              solicitud.
            </p>

            <div className="appointment-form__fields appointment-form__fields--two">
              <div className="field">
                <label className="field__label" htmlFor="fullName">
                  Nombre completo <span aria-hidden="true">*</span>
                </label>
                <input
                  className="field__control"
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Nombre y apellidos"
                  value={values.fullName}
                  onChange={(event) => updateValue('fullName', event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'name-error' : undefined}
                />
                {errors.fullName ? (
                  <p className="field__error" id="name-error">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="phone">
                  Teléfono <span aria-hidden="true">*</span>
                </label>
                <input
                  className="field__control"
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10 dígitos"
                  value={values.phone}
                  onChange={(event) => updateValue('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                />
                <span className="field__hint" id="phone-hint">
                  Se usará para confirmar tu cita.
                </span>
                {errors.phone ? (
                  <p className="field__error" id="phone-error">
                    {errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="field appointment-form__field-full">
                <label className="field__label" htmlFor="email">
                  Correo electrónico <span className="field__optional">(opcional)</span>
                </label>
                <input
                  className="field__control"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={values.email}
                  onChange={(event) => updateValue('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <p className="field__error" id="email-error">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="appointment-form__privacy">
              <ShieldCheck size={17} strokeWidth={1.5} aria-hidden="true" />
              <p>
                No compartas datos clínicos sensibles en este formulario. La información
                médica se revisa durante la consulta.
              </p>
            </div>

            <label className="check appointment-form__consent">
              <input
                type="checkbox"
                name="consent"
                checked={values.consent}
                onChange={(event) => updateValue('consent', event.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
              />
              <span>
                Acepto el{' '}
                <Link to="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer">
                  aviso de privacidad
                </Link>{' '}
                y el uso de mis datos de contacto para dar seguimiento a esta solicitud.
              </span>
            </label>
            {errors.consent ? (
              <p className="field__error" id="consent-error">
                {errors.consent}
              </p>
            ) : null}
          </fieldset>
        ) : null}

        {step === 4 ? (
          <div className="appointment-step">
            <p className="appointment-form__kicker">Paso 4</p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="appointment-form__title">
              Revisa tu solicitud.
            </h2>
            <p className="appointment-form__intro">
              Verifica que la información sea correcta. Al continuar, se abrirá WhatsApp
              con tu solicitud lista para enviar.
            </p>

            <div className="appointment-review">
              <div className="appointment-review__group">
                <div className="appointment-review__head">
                  <span>Consulta</span>
                  <button type="button" onClick={() => handleEdit(1)}>
                    Editar
                  </button>
                </div>
                <strong>{selectedService?.title}</strong>
                <p>{selectedService?.summary}</p>
              </div>

              <div className="appointment-review__group">
                <div className="appointment-review__head">
                  <span>Fecha y preferencia</span>
                  <button type="button" onClick={() => handleEdit(2)}>
                    Editar
                  </button>
                </div>
                <strong>{formatLongDate(values.preferredDate)}</strong>
                <p>{currentPeriod}</p>
              </div>

              <div className="appointment-review__group">
                <div className="appointment-review__head">
                  <span>Datos de contacto</span>
                  <button type="button" onClick={() => handleEdit(3)}>
                    Editar
                  </button>
                </div>
                <strong>{values.fullName}</strong>
                <p>
                  {values.phone}
                  {values.email ? ` · ${values.email}` : ''}
                </p>
              </div>
            </div>

            <div className="appointment-review__notice">
              <ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <strong>Esto es una solicitud, no una cita confirmada.</strong>
                <p>
                  Aún no se ha reservado ningún horario. La confirmación depende de la
                  respuesta del consultorio.
                </p>
              </div>
            </div>

            <div className="appointment-review__submit">
              <button type="button" className="btn btn--rose btn--block" onClick={handleSubmit}>
                <WhatsAppIcon size={20} />
                Enviar solicitud por WhatsApp
              </button>
              <p>
                Se abrirá WhatsApp con un mensaje prellenado. Deberás presionar enviar
                dentro de la aplicación.
              </p>
            </div>
          </div>
        ) : null}

        {step < 4 ? (
          <div className="appointment-form__nav">
            {step > 1 ? (
              <button type="button" className="btn btn--outline" onClick={handleBack}>
                <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
                Atrás
              </button>
            ) : (
              <Link className="appointment-form__cancel" to="/contacto">
                Prefiero llamar
              </Link>
            )}

            <button type="submit" className="btn btn--primary">
              {step === 3 ? 'Revisar solicitud' : 'Continuar'}
              <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="appointment-form__nav appointment-form__nav--review">
            <button type="button" className="btn btn--outline" onClick={() => handleEdit(3)}>
              <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
              Atrás
            </button>
            <span className="appointment-form__nav-note">
              <Sparkles size={14} strokeWidth={1.5} aria-hidden="true" />
              Tus datos solo se usan para esta solicitud.
            </span>
          </div>
        )}
      </form>

      <p className="appointment-form__contact-fallback">
        <CalendarDays size={14} strokeWidth={1.6} aria-hidden="true" />
        ¿Prefieres hablar?{' '}
        <a href={contact.phoneHref}>Llama al {contact.phone}</a>
        <span className="appointment-form__fallback-separator" aria-hidden="true">
          ·
        </span>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </p>
    </div>
  )
}
