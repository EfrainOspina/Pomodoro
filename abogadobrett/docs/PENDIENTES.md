# Información pendiente del propietario

Nada de esto se ha inventado. Con `npm run build:review` cada dato pendiente aparece marcado en rojo dentro de la página; en producción (`npm run build`) no se muestra.

## Bloqueantes antes de publicar

| # | Dato | Dónde se usa | Archivo |
|---|------|--------------|---------|
| 1 | Credenciales de GoHighLevel: Private Integration Token + Location ID (o URL del webhook entrante de un workflow) | Registro automático de leads | Variables de entorno en Netlify (ver `docs/ENTREGA.md` §6) |
| 2 | Responsable del tratamiento: domicilio y número fiscal; plazo de conservación; nombre del CRM y garantías de transferencia | Política de privacidad (RGPD) | `src/pages.mjs` → `privacy()` |
| 3 | Revisión legal del texto de privacidad | Privacidad | idem |
| 4 | Confirmar si el envío del formulario incluye una evaluación preliminar **gratuita** (el sitio actual tiene una página «Asesoría legal y migratoria GRATIS» de contenido desconocido) | FAQ de portada, textos de formulario | `src/pages.mjs` (`homeFaq`) |
| 5 | Plazo real de respuesta a una solicitud (p. ej. «48 h hábiles») | Nota del formulario | `src/lib/components.mjs` → `leadForm()` |
| 6 | Decisión sobre el blog: mantener WordPress en un subdominio o migrar los ~89 artículos | URLs y SEO de los artículos | `build.mjs` (`_redirects`) |

## Credenciales y autoridad (sección «Sobre Johan»)

7. Título profesional exacto, universidad y año (el sitio solo dice «Estudié en Venezuela, en Italia»).
8. Inscripción en el Colegio de Abogados (estado/número) y jurisdicciones en las que puede ejercer. **Importante:** en Italia «avvocato» es un título protegido; el sitio usa «abogado venezolano» y «asesor legal y migratorio» hasta confirmar.
9. Años de ejercicio y trayectoria verificable (cargos, áreas de práctica).
10. Ciudad de residencia/atención en Italia.
11. Idiomas de atención (se indica español e italiano; confirmar).
12. Confirmar la cifra «más de 1.000 casos acompañados» (aparece en un artículo del blog). No se usa en el sitio hasta que se confirme.
13. Horario de atención y zona horaria.

## Prueba social

14. Testimonios **autorizados por escrito**: nombre (o iniciales), país, servicio, texto literal y, si se autoriza, foto. Se añaden en `src/data/testimonials.mjs` y la sección aparece sola en la portada.
15. URL del vídeo de testimonios que existe en la página de Mentorías actual.
16. Casos documentados publicables (anonimizados y con autorización), si los hay.

## Comercial

17. Precio o rango de la consulta de 60 min y de la mentoría (el sitio actual solo dice «ahorras hasta $300»). Hoy el sitio indica que el valor se informa antes de agendar.
18. ¿Quién atiende los leads? (asignación comercial en GoHighLevel) y nombres de las etapas del pipeline.
19. Confirmar que los dos enlaces de Calendly siguen activos y cuál usar para cada servicio.
20. Confirmar la vigencia del correo `gestoriasbg@gmail.com` para documentos.
21. ¿Hay un número de WhatsApp italiano (+39)? Hoy solo se publica el venezolano (+58 414 641 2391).
22. Destino de los enlaces cortos `wkf.ms/...` del sitio actual (posibles formularios o embudos existentes que haya que conservar o redirigir).

## Imagen

23. Fotografías profesionales en alta resolución (mín. 1600 px): retrato vertical para el hero, plano medio para «Sobre Johan» y 2–3 fotos de contexto en Italia. Las actuales son de 600 px y 514 px.
24. Logotipo oficial, si existe. Se ha creado un monograma «JB» provisional.

## Analítica

25. ID de Google Tag Manager (`GTM-XXXXXXX`), propiedad de GA4 y, si aplica, ID de Meta Pixel.
