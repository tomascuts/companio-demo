import React from 'react'
import { Box, Typography, TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, IconButton } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

export default function LoginInfoForm({ formData, handleInputChange, handleSubmitForm, setStep }) {
  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => setStep(3)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={2}>¡Queremos conocerte mejor!</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>INFORMACIÓN:</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {['nombreCompleto', 'fechaNacimiento', 'direccion', 'localidad'].map((field) => (
            <TextField
              key={field}
              fullWidth
              name={field}
              label={field.split(/(?=[A-Z])/).join(' ')}
              variant="outlined"
              value={formData[field]}
              onChange={handleInputChange}
              type={field === 'fechaNacimiento' ? 'date' : 'text'}
              InputLabelProps={field === 'fechaNacimiento' ? { shrink: true } : {}}
            />
          ))}
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>DESCRIPCIÓN:</Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            name="actividades"
            label="Contanos sobre tus actividades diarias"
            multiline
            rows={4}
            variant="outlined"
            value={formData.actividades}
            onChange={handleInputChange}
          />

          {formData.userType === 'asistido' ? (
            <>
              <FormControl component="fieldset">
                <FormLabel component="legend">¿Cómo evaluarías el nivel de su actividad física?</FormLabel>
                <RadioGroup
                  name="nivelActividad"
                  value={formData.nivelActividad}
                  onChange={handleInputChange}
                >
                  {['alta', 'media', 'baja'].map((level) => (
                    <FormControlLabel key={level} value={level} control={<Radio />} label={level.charAt(0).toUpperCase() + level.slice(1)} />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">¿Tienes alguna enfermedad/discapacidad/otro?</FormLabel>
                <RadioGroup
                  name="tieneEnfermedad"
                  value={formData.tieneEnfermedad}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Si" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {formData.tieneEnfermedad === 'si' && (
                <TextField
                  fullWidth
                  name="enfermedad"
                  label="En caso de afirmativo, ¿Cuál?"
                  variant="outlined"
                  value={formData.enfermedad}
                  onChange={handleInputChange}
                />
              )}
            </>
          ) : (
            <FormControl component="fieldset">
              <FormLabel component="legend">¿En qué tareas te gustaría brindar asistencia?</FormLabel>
              <Box>
                {[
                  { id: 'acompanamiento', label: 'Acompañamiento' },
                  { id: 'ayuda_compras', label: 'Ayuda con las compras' },
                  { id: 'tramites_online', label: 'Ayuda con trámites online' },
                  { id: 'tramites_presenciales', label: 'Ayuda con trámites presenciales' },
                  { id: 'pasear_perro', label: 'Pasear al perro' },
                  { id: 'ayuda_tecnologia', label: 'Ayuda con la tecnología' },
                ].map((task) => (
                  <FormControlLabel
                    key={task.id}
                    control={
                      <Checkbox
                        checked={formData.tareasAsistencia.includes(task.id)}
                        onChange={(e) => {
                          const updatedTasks = e.target.checked
                            ? [...formData.tareasAsistencia, task.id]
                            : formData.tareasAsistencia.filter((id) => id !== task.id);
                          handleInputChange({ target: { name: 'tareasAsistencia', value: updatedTasks } });
                        }}
                      />
                    }
                    label={task.label}
                  />
                ))}
              </Box>
            </FormControl>
          )}
        </Box>
      </Box>

      <Button 
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSubmitForm}
        sx={{ mt: 4 }}
      >
        Continuar
      </Button>
    </Box>
  )
}