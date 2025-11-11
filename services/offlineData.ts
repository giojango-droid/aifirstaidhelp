import { Guidance } from '../types';

const offlineEmergencies: Record<string, Record<string, Guidance>> = {
  en: {
    "Someone with chest pain and shortness of breath": {
      "situation": "Person experiencing chest pain and shortness of breath, possibly indicating a cardiac event.",
      "immediateAssessment": ["Ensure the scene is safe.", "Ask the person to sit down comfortably.", "Loosen any tight clothing.", "Ask if they have prescribed medication for chest pain."],
      "criticalSymptoms": ["Pain spreading to arms, back, neck, jaw, or stomach.", "Dizziness or fainting.", "Sweating, nausea, or vomiting.", "Pale or bluish skin."],
      "firstAidMeasures": ["Call emergency services immediately.", "Keep the person calm.", "If prescribed, help them take one adult aspirin.", "Be prepared to perform CPR if they become unconscious."],
      "seekMedicalAssistance": ["Contact emergency services immediately for any unexplained chest pain.", "Do not transport the person yourself; wait for the ambulance."],
      "disclaimer": "This is not a substitute for professional medical advice. Chest pain can be a sign of a life-threatening condition.",
      "source": "OFFLINE"
    },
    "Severe allergic reaction (anaphylaxis)": {
      "situation": "Person experiencing a severe, life-threatening allergic reaction (anaphylaxis).",
      "immediateAssessment": ["Check for signs of a severe allergic reaction (difficulty breathing, swelling, rash).", "Ask if they have a known allergy and carry an epinephrine auto-injector.", "Help them use the auto-injector immediately."],
      "criticalSymptoms": ["Wheezing or inability to speak.", "Rapid swelling of the throat or tongue.", "A sense of doom or anxiety.", "Confusion or loss of consciousness."],
      "firstAidMeasures": ["Call emergency services immediately, even if an auto-injector has been used.", "Help the person lie on their back; on their side if vomiting.", "Keep them warm.", "Consider a second dose if available and symptoms don't improve after 5-15 minutes."],
      "seekMedicalAssistance": ["Anaphylaxis is a medical emergency. Always call for help.", "The person must go to a hospital for observation."],
      "disclaimer": "This is not a substitute for professional medical advice. Always seek immediate medical attention for anaphylaxis.",
      "source": "OFFLINE"
    },
    "Someone fainting or losing consciousness": {
        "situation": "Person has fainted or temporarily lost consciousness.",
        "immediateAssessment": ["Check for responsiveness and breathing. Start CPR if not breathing.", "If breathing, lay them flat and elevate their legs.", "Loosen restrictive clothing.", "Check for injuries from the fall."],
        "criticalSymptoms": ["Not waking up within one minute.", "Experiencing chest pain or severe headache.", "Seizure activity.", "Loss of bladder or bowel control."],
        "firstAidMeasures": ["Ensure fresh air.", "Do not give food or drink until fully conscious.", "Have them sit for 10-15 minutes before standing.", "Treat any injuries from the fall."],
        "seekMedicalAssistance": ["Call emergency services if they don't regain consciousness quickly, have critical symptoms, are pregnant, or have other known conditions.", "Seek medical advice even for simple fainting."],
        "disclaimer": "This guidance is for informational purposes. Fainting can be a sign of a serious medical condition. Always consult a healthcare professional.",
        "source": "OFFLINE"
    },
    "Diabetic emergency (hypoglycemia or hyperglycemia)": {
        "situation": "Person with diabetes is experiencing an emergency due to very low (hypoglycemia) or very high (hyperglycemia) blood sugar.",
        "immediateAssessment": ["If conscious, ask if they have diabetes.", "For low blood sugar, look for confusion, shakiness, sweating.", "For high blood sugar, look for drowsiness, dry mouth, fruity-smelling breath."],
        "criticalSymptoms": ["Unresponsiveness or loss of consciousness.", "Seizures.", "Inability to swallow.", "Rapid, deep breathing (for high blood sugar)."],
        "firstAidMeasures": ["If low blood sugar and can swallow, give 15-20g of fast-acting sugar (juice, glucose tablets).", "Wait 15 minutes; if not better, repeat sugar.", "If unconscious, do NOT give food/drink. Call emergency services.", "If high blood sugar, help them take insulin if they can and drink water."],
        "seekMedicalAssistance": ["Call emergency services immediately if the person is unconscious, having a seizure, or not improving.", "Severe hyperglycemia requires medical evaluation."],
        "disclaimer": "This is a first aid guide. Follow the person's specific diabetes plan and seek professional help in an emergency.",
        "source": "OFFLINE"
    },
    "Someone having a seizure": {
        "situation": "Person is experiencing a seizure with convulsions or altered consciousness.",
        "immediateAssessment": ["Keep calm and time the seizure.", "Protect the person from injury by clearing the area.", "Place something soft under their head.", "Loosen tight clothing around the neck."],
        "criticalSymptoms": ["Seizure lasts longer than 5 minutes.", "A second seizure starts soon after.", "Difficulty breathing or turning blue.", "Person is injured or has a known medical condition."],
        "firstAidMeasures": ["Do NOT hold the person down.", "Do NOT put anything in their mouth.", "After convulsions stop, roll them onto their side (recovery position).", "Stay with them and speak calmly until they are fully aware."],
        "seekMedicalAssistance": ["Call emergency services if any critical symptoms are present, it's their first seizure, or it happens in water.", "Always call for help if unsure."],
        "disclaimer": "This information is for first aid. Seizures require a proper medical diagnosis and management plan.",
        "source": "OFFLINE"
    },
    "Heavy bleeding from an injury": {
        "situation": "Person is experiencing heavy or uncontrolled bleeding from a wound.",
        "immediateAssessment": ["Ensure scene safety; wear gloves if available.", "Identify the source of bleeding.", "Do not remove any embedded objects."],
        "criticalSymptoms": ["Blood spurting from the wound.", "Bleeding that doesn't stop with pressure.", "Signs of shock (pale, cold skin, weakness, dizziness)."],
        "firstAidMeasures": ["Call emergency services immediately.", "Apply firm, direct pressure with a clean cloth.", "Elevate the limb above the heart if possible.", "If blood soaks through, add more cloths on top; do not remove the first one.", "Use a tourniquet only if trained and necessary for a limb injury."],
        "seekMedicalAssistance": ["All severe, uncontrolled bleeding requires immediate emergency medical attention.", "Seek help for deep wounds or wounds that may need stitches."],
        "disclaimer": "This is a first aid guide. Uncontrolled bleeding is life-threatening. Prioritize calling for emergency help immediately.",
        "source": "OFFLINE"
    }
  },
  es: {
    "Alguien con dolor de pecho y dificultad para respirar": {
      "situation": "Persona con dolor de pecho y dificultad para respirar, posiblemente indicando un evento cardíaco.",
      "immediateAssessment": ["Asegure que la escena sea segura.", "Pida a la persona que se siente cómodamente.", "Afloje la ropa apretada.", "Pregunte si tienen medicación prescrita para el dolor de pecho."],
      "criticalSymptoms": ["Dolor que se extiende a brazos, espalda, cuello, mandíbula o estómago.", "Mareos o desmayos.", "Sudoración, náuseas o vómitos.", "Piel pálida o azulada."],
      "firstAidMeasures": ["Llame a los servicios de emergencia inmediatamente.", "Mantenga a la persona calmada.", "Si está prescrito, ayúdele a tomar una aspirina de adulto.", "Esté preparado para realizar RCP si pierde el conocimiento."],
      "seekMedicalAssistance": ["Contacte a los servicios de emergencia inmediatamente por cualquier dolor de pecho inexplicable.", "No transporte a la persona usted mismo; espere la ambulancia."],
      "disclaimer": "Esto no sustituye el consejo médico profesional. El dolor de pecho puede ser un signo de una condición potencialmente mortal.",
      "source": "OFFLINE"
    },
    "Reacción alérgica grave (anafilaxia)": {
      "situation": "Persona experimentando una reacción alérgica grave y potencialmente mortal (anafilaxia).",
      "immediateAssessment": ["Verifique si hay signos de reacción alérgica grave (dificultad para respirar, hinchazón, sarpullido).", "Pregunte si tienen una alergia conocida y si llevan un autoinyector de epinefrina.", "Ayúdelos a usar el autoinyector inmediatamente."],
      "criticalSymptoms": ["Sibilancias o incapacidad para hablar.", "Hinchazón rápida de la garganta o lengua.", "Sensación de fatalidad o ansiedad.", "Confusión o pérdida de conciencia."],
      "firstAidMeasures": ["Llame a los servicios de emergencia inmediatamente, incluso si se ha usado un autoinyector.", "Ayude a la persona a acostarse boca arriba; de lado si vomita.", "Manténgala abrigada.", "Considere una segunda dosis si está disponible y los síntomas no mejoran después de 5-15 minutos."],
      "seekMedicalAssistance": ["La anafilaxia es una emergencia médica. Siempre llame para pedir ayuda.", "La persona debe ir a un hospital para observación."],
      "disclaimer": "Esto no sustituye el consejo médico profesional. Busque siempre atención médica inmediata para la anafilaxia.",
      "source": "OFFLINE"
    },
    "Alguien desmayándose o perdiendo el conocimiento": {
        "situation": "Una persona se ha desmayado o ha perdido el conocimiento temporalmente.",
        "immediateAssessment": ["Verifique la capacidad de respuesta y la respiración. Inicie la RCP si no respira.", "Si respira, acuéstela y eleve las piernas.", "Afloje la ropa restrictiva.", "Revise si hay lesiones por la caída."],
        "criticalSymptoms": ["No se despierta en un minuto.", "Experimenta dolor en el pecho o dolor de cabeza intenso.", "Actividad convulsiva.", "Pérdida del control de la vejiga o los intestinos."],
        "firstAidMeasures": ["Asegure aire fresco.", "No dé comida ni bebida hasta que esté completamente consciente.", "Haga que se siente durante 10-15 minutos antes de levantarse.", "Trate cualquier lesión por la caída."],
        "seekMedicalAssistance": ["Llame a los servicios de emergencia si no recupera el conocimiento rápidamente, tiene síntomas críticos, está embarazada o tiene otras afecciones conocidas.", "Busque consejo médico incluso para un simple desmayo."],
        "disclaimer": "Esta guía es para fines informativos. El desmayo puede ser un signo de una afección médica grave. Consulte siempre a un profesional de la salud.",
        "source": "OFFLINE"
    },
    "Emergencia diabética (hipoglucemia o hiperglucemia)": {
        "situation": "Persona con diabetes que experimenta una emergencia debido a un nivel de azúcar en sangre muy bajo (hipoglucemia) o muy alto (hiperglucemia).",
        "immediateAssessment": ["Si está consciente, pregúntele si tiene diabetes.", "Para el nivel bajo de azúcar, busque confusión, temblores, sudoración.", "Para el nivel alto de azúcar, busque somnolencia, boca seca, aliento con olor a fruta."],
        "criticalSymptoms": ["Falta de respuesta o pérdida de conocimiento.", "Convulsiones.", "Incapacidad para tragar.", "Respiración rápida y profunda (para nivel alto de azúcar)."],
        "firstAidMeasures": ["Si se sospecha un nivel bajo de azúcar y puede tragar, dé 15-20 g de azúcar de acción rápida (zumo, tabletas de glucosa).", "Espere 15 minutos; si no mejora, repita el azúcar.", "Si está inconsciente, NO le dé comida/bebida. Llame a emergencias.", "Si el nivel de azúcar es alto, ayúdele a tomar insulina si puede y a beber agua."],
        "seekMedicalAssistance": ["Llame a los servicios de emergencia inmediatamente si la persona está inconsciente, tiene una convulsión o no mejora.", "La hiperglucemia grave requiere evaluación médica."],
        "disclaimer": "Esta es una guía de primeros auxilios. Siga el plan específico para la diabetes de la persona y busque ayuda profesional en una emergencia.",
        "source": "OFFLINE"
    },
    "Alguien teniendo una convulsión": {
        "situation": "Persona que está experimentando una convulsión con convulsiones o alteración de la conciencia.",
        "immediateAssessment": ["Mantenga la calma y cronometre la convulsión.", "Proteja a la persona de lesiones despejando el área.", "Coloque algo suave debajo de su cabeza.", "Afloje la ropa ajustada alrededor del cuello."],
        "criticalSymptoms": ["La convulsión dura más de 5 minutos.", "Comienza una segunda convulsión poco después.", "Dificultad para respirar o se pone azul.", "La persona se lesiona o tiene una condición médica conocida."],
        "firstAidMeasures": ["NO sujete a la persona.", "NO le ponga nada en la boca.", "Después de las convulsiones, gírela de lado (posición de recuperación).", "Quédese con ella y hable con calma hasta que esté completamente despierta."],
        "seekMedicalAssistance": ["Llame a los servicios de emergencia si hay síntomas críticos, es su primera convulsión o ocurre en el agua.", "Siempre pida ayuda si no está seguro."],
        "disclaimer": "Esta información es para primeros auxilios. Las convulsiones requieren un diagnóstico y un plan de manejo adecuados.",
        "source": "OFFLINE"
    },
    "Sangrado abundante por una herida": {
        "situation": "Persona que experimenta una hemorragia grave o incontrolada de una herida.",
        "immediateAssessment": ["Garantice la seguridad del lugar; use guantes si es posible.", "Identifique el origen de la hemorragia.", "No retire ningún objeto incrustado."],
        "criticalSymptoms": ["Sangre que sale a chorros de la herida.", "Hemorragia que no se detiene con la presión.", "Signos de shock (piel pálida y fría, debilidad, mareos)."],
        "firstAidMeasures": ["Llame a los servicios de emergencia inmediatamente.", "Aplique presión directa y firme con un paño limpio.", "Eleve la extremidad por encima del corazón si es posible.", "Si la sangre empapa el paño, añada más encima; no retire el primero.", "Use un torniquete solo si está entrenado y es necesario para una lesión en una extremidad."],
        "seekMedicalAssistance": ["Toda hemorragia grave e incontrolada requiere atención médica de emergencia inmediata.", "Busque ayuda para heridas profundas o que puedan necesitar suturas."],
        "disclaimer": "Esta es una guía de primeros auxilios. La hemorragia incontrolada es potencialmente mortal. Priorice llamar a emergencias de inmediato.",
        "source": "OFFLINE"
    }
  },
  fr: {
    "Quelqu'un avec une douleur à la poitrine et un essoufflement": {
      "situation": "Personne souffrant de douleurs thoraciques et d'essoufflement, indiquant possiblement un événement cardiaque.",
      "immediateAssessment": ["Assurez la sécurité des lieux.", "Demandez à la personne de s'asseoir confortablement.", "Desserrez tout vêtement serré.", "Demandez si elle a des médicaments prescrits pour les douleurs thoraciques."],
      "criticalSymptoms": ["Douleur irradiant vers les bras, le dos, le cou, la mâchoire ou l'estomac.", "Vertiges ou évanouissement.", "Transpiration, nausées ou vomissements.", "Peau pâle ou bleutée."],
      "firstAidMeasures": ["Appelez immédiatement les services d'urgence.", "Gardez la personne calme.", "Si prescrit, aidez-la à prendre un comprimé d'aspirine pour adulte.", "Soyez prêt à pratiquer la RCR si elle perd connaissance."],
      "seekMedicalAssistance": ["Contactez immédiatement les services d'urgence pour toute douleur thoracique inexpliquée.", "Ne transportez pas la personne vous-même ; attendez l'ambulance."],
      "disclaimer": "Ceci ne remplace pas un avis médical professionnel. Une douleur thoracique peut être le signe d'une condition potentiellement mortelle.",
      "source": "OFFLINE"
    },
    "Réaction allergique grave (anaphylaxie)": {
      "situation": "Personne subissant une réaction allergique grave et potentiellement mortelle (anaphylaxie).",
      "immediateAssessment": ["Recherchez des signes de réaction allergique grave (difficulté à respirer, gonflement, éruption cutanée).", "Demandez si elle a une allergie connue et un auto-injecteur d'épinéphrine.", "Aidez-la à utiliser l'auto-injecteur immédiatement."],
      "criticalSymptoms": ["Sifflements ou incapacité de parler.", "Gonflement rapide de la gorge ou de la langue.", "Sentiment de catastrophe imminente ou anxiété.", "Confusion ou perte de connaissance."],
      "firstAidMeasures": ["Appelez immédiatement les services d'urgence, même si un auto-injecteur a été utilisé.", "Aidez la personne à s'allonger sur le dos ; sur le côté si elle vomit.", "Gardez-la au chaud.", "Envisagez une deuxième dose si disponible et si les symptômes ne s'améliorent pas après 5-15 minutes."],
      "seekMedicalAssistance": ["L'anaphylaxie est une urgence médicale. Appelez toujours à l'aide.", "La personne doit se rendre à l'hôpital pour observation."],
      "disclaimer": "Ceci ne remplace pas un avis médical professionnel. Consultez toujours immédiatement un médecin en cas d'anaphylaxie.",
      "source": "OFFLINE"
    },
     "Quelqu'un qui s'évanouit ou perd connaissance": {
        "situation": "Une personne s'est évanouie ou a temporairement perdu connaissance.",
        "immediateAssessment": ["Vérifiez la réactivité et la respiration. Commencez la RCR si elle ne respire pas.", "Si elle respire, allongez-la et surélevez ses jambes.", "Desserrez les vêtements serrés.", "Vérifiez s'il y a des blessures dues à la chute."],
        "criticalSymptoms": ["Ne se réveille pas en une minute.", "Ressent une douleur thoracique ou un mal de tête sévère.", "Activité convulsive.", "Perte de contrôle de la vessie ou des intestins."],
        "firstAidMeasures": ["Assurez une bonne aération.", "Ne donnez ni à manger ni à boire tant qu'elle n'est pas complètement consciente.", "Faites-la asseoir pendant 10-15 minutes avant de se lever.", "Traitez les blessures dues à la chute."],
        "seekMedicalAssistance": ["Appelez les services d'urgence si elle ne reprend pas rapidement connaissance, présente des symptômes critiques, est enceinte ou a d'autres affections connues.", "Consultez un médecin même pour un simple évanouissement."],
        "disclaimer": "Ce guide est à titre informatif. L'évanouissement peut être le signe d'une affection médicale grave. Consultez toujours un professionnel de la santé.",
        "source": "OFFLINE"
    },
    "Urgence diabétique (hypoglycémie ou hyperglycémie)": {
        "situation": "Personne diabétique en situation d'urgence en raison d'une glycémie très basse (hypoglycémie) ou très élevée (hyperglycémie).",
        "immediateAssessment": ["Si consciente, demandez si elle est diabétique.", "Pour une hypoglycémie, recherchez confusion, tremblements, sueurs.", "Pour une hyperglycémie, recherchez somnolence, bouche sèche, haleine fruitée."],
        "criticalSymptoms": ["Absence de réaction ou perte de connaissance.", "Convulsions.", "Incapacité à avaler.", "Respiration rapide et profonde (pour l'hyperglycémie)."],
        "firstAidMeasures": ["En cas de suspicion d'hypoglycémie et si elle peut avaler, donnez 15-20g de sucre rapide (jus, comprimés de glucose).", "Attendez 15 minutes ; si pas d'amélioration, répétez.", "Si inconsciente, ne donnez PAS de nourriture/boisson. Appelez les urgences.", "En cas d'hyperglycémie, aidez-la à prendre son insuline si possible et à boire de l'eau."],
        "seekMedicalAssistance": ["Appelez immédiatement les services d'urgence si la personne est inconsciente, a une crise convulsive ou ne s'améliore pas.", "Une hyperglycémie sévère nécessite une évaluation médicale."],
        "disclaimer": "Ceci est un guide de premiers secours. Suivez le plan de traitement du diabète spécifique de la personne et demandez l'aide d'un professionnel en cas d'urgence.",
        "source": "OFFLINE"
    },
    "Quelqu'un qui a une crise d'épilepsie": {
        "situation": "Personne qui a une crise d'épilepsie avec des convulsions ou une altération de la conscience.",
        "immediateAssessment": ["Restez calme et chronométrez la crise.", "Protégez la personne contre les blessures en dégageant la zone.", "Placez quelque chose de mou sous sa tête.", "Desserrez les vêtements serrés autour du cou."],
        "criticalSymptoms": ["La crise dure plus de 5 minutes.", "Une deuxième crise commence peu de temps après.", "Difficulté à respirer ou devient bleue.", "La personne est blessée ou a une condition médicale connue."],
        "firstAidMeasures": ["NE PAS retenir la personne.", "NE RIEN mettre dans sa bouche.", "Après l'arrêt des convulsions, mettez-la sur le côté (position latérale de sécurité).", "Restez avec elle et parlez calmement jusqu'à ce qu'elle soit pleinement consciente."],
        "seekMedicalAssistance": ["Appelez les services d'urgence si des symptômes critiques sont présents, si c'est sa première crise ou si elle se produit dans l'eau.", "Appelez toujours à l'aide en cas de doute."],
        "disclaimer": "Ces informations sont pour les premiers secours. Les crises d'épilepsie nécessitent un diagnostic et un plan de gestion médicale appropriés.",
        "source": "OFFLINE"
    },
    "Saignement abondant d'une blessure": {
        "situation": "Personne qui saigne abondamment ou de manière incontrôlée d'une blessure.",
        "immediateAssessment": ["Assurez la sécurité des lieux ; portez des gants si disponibles.", "Identifiez la source du saignement.", "Ne retirez aucun objet incrusté."],
        "criticalSymptoms": ["Sang qui jaillit de la blessure.", "Saignement qui ne s'arrête pas avec la pression.", "Signes de choc (peau pâle et froide, faiblesse, vertiges)."],
        "firstAidMeasures": ["Appelez immédiatement les services d'urgence.", "Appliquez une pression directe et ferme avec un tissu propre.", "Surélevez le membre au-dessus du cœur si possible.", "Si le sang traverse le tissu, ajoutez-en d'autres par-dessus ; ne retirez pas le premier.", "Utilisez un garrot uniquement si vous êtes formé et si c'est nécessaire pour une blessure à un membre."],
        "seekMedicalAssistance": ["Tout saignement grave et incontrôlé nécessite une attention médicale d'urgence immédiate.", "Consultez un médecin pour les plaies profondes ou celles qui pourraient nécessiter des points de suture."],
        "disclaimer": "Ceci est un guide de premiers secours. Un saignement incontrôlé est potentiellement mortel. Priorisez l'appel aux secours immédiatement.",
        "source": "OFFLINE"
    }
  },
  ar: {
    "شخص يعاني من ألم في الصدر وضيق في التنفس": {
      "situation": "شخص يعاني من ألم في الصدر وضيق في التنفس، مما قد يشير إلى نوبة قلبية.",
      "immediateAssessment": ["تأكد من أن المكان آمن.", "اطلب من الشخص الجلوس بشكل مريح.", "أرخِ أي ملابس ضيقة.", "اسأل إذا كان لديه دواء موصوف لألم الصدر."],
      "criticalSymptoms": ["انتشار الألم إلى الذراعين أو الظهر أو الرقبة أو الفك أو المعدة.", "دوار أو إغماء.", "تعرق أو غثيان أو قيء.", "شحوب الجلد أو ازرقاقه."],
      "firstAidMeasures": ["اتصل بخدمات الطوارئ فورًا.", "حافظ على هدوء الشخص.", "إذا كان موصوفًا له، ساعده على تناول حبة أسبرين واحدة للبالغين.", "كن مستعدًا لإجراء الإنعاش القلبي الرئوي إذا فقد وعيه."],
      "seekMedicalAssistance": ["اتصل بخدمات الطوارئ فورًا لأي ألم في الصدر غير مبرر.", "لا تنقل الشخص بنفسك؛ انتظر سيارة الإسعاف."],
      "disclaimer": "هذا ليس بديلاً عن المشورة الطبية المتخصصة. يمكن أن يكون ألم الصدر علامة على حالة تهدد الحياة.",
      "source": "OFFLINE"
    },
    "رد فعل تحسسي شديد (الحساسية المفرطة)": {
      "situation": "شخص يعاني من رد فعل تحسسي شديد ومهدد للحياة (الحساسية المفرطة).",
      "immediateAssessment": ["تحقق من وجود علامات رد فعل تحسسي شديد (صعوبة في التنفس، تورم، طفح جلدي).", "اسأل إذا كان لديه حساسية معروفة ويحمل حاقنًا ذاتيًا للإبينفرين.", "ساعده على استخدام الحاقن الذاتي فورًا."],
      "criticalSymptoms": ["صفير عند التنفس أو عدم القدرة على الكلام.", "تورم سريع في الحلق أو اللسان.", "شعور بالهلاك أو القلق.", "ارتباك أو فقدان للوعي."],
      "firstAidMeasures": ["اتصل بخدمات الطوارئ فورًا، حتى لو تم استخدام الحاقن الذاتي.", "ساعد الشخص على الاستلقاء على ظهره؛ على جانبه إذا كان يتقيأ.", "حافظ على دفئه.", "فكر في إعطاء جرعة ثانية إذا كانت متاحة ولم تتحسن الأعراض بعد 5-15 دقيقة."],
      "seekMedicalAssistance": ["الحساسية المفرطة هي حالة طبية طارئة. اتصل دائمًا لطلب المساعدة.", "يجب نقل الشخص إلى المستشفى للمراقبة."],
      "disclaimer": "هذا ليس بديلاً عن المشورة الطبية المتخصصة. اطلب دائمًا العناية الطبية الفورية للحساسية المفرطة.",
      "source": "OFFLINE"
    },
    "شخص يغمى عليه أو يفقد وعيه": {
        "situation": "شخص أغمي عليه أو فقد وعيه مؤقتًا.",
        "immediateAssessment": ["تحقق من الاستجابة والتنفس. ابدأ الإنعاش القلبي الرئوي إذا لم يكن يتنفس.", "إذا كان يتنفس، فضعه على ظهره وارفع ساقيه.", "أرخِ الملابس الضيقة.", "تحقق من وجود إصابات ناتجة عن السقوط."],
        "criticalSymptoms": ["لم يستيقظ خلال دقيقة واحدة.", "يعاني من ألم في الصدر أو صداع شديد.", "حدوث نوبة صرع.", "فقدان السيطرة على المثانة أو الأمعاء."],
        "firstAidMeasures": ["تأكد من وجود هواء نقي.", "لا تعطه طعامًا أو شرابًا حتى يعود إلى وعيه بالكامل.", "اجعله يجلس لمدة 10-15 دقيقة قبل الوقوف.", "عالج أي إصابات ناتجة عن السقوط."],
        "seekMedicalAssistance": ["اتصل بخدمات الطوارئ إذا لم يستعد وعيه بسرعة، أو ظهرت عليه أعراض حرجة، أو كانت امرأة حامل، أو لديه حالات طبية أخرى معروفة.", "اطلب المشورة الطبية حتى في حالة الإغماء البسيط."],
        "disclaimer": "هذه الإرشادات لأغراض إعلامية. قد يكون الإغماء علامة على حالة طبية خطيرة. استشر دائمًا أخصائي رعاية صحية.",
        "source": "OFFLINE"
    },
    "طوارئ السكري (نقص السكر في الدم أو ارتفاعه)": {
        "situation": "شخص مصاب بالسكري يعاني من حالة طارئة بسبب انخفاض شديد (نقص السكر) أو ارتفاع شديد (ارتفاع السكر) في سكر الدم.",
        "immediateAssessment": ["إذا كان واعيًا، اسأله إذا كان مصابًا بالسكري.", "في حالة انخفاض السكر، ابحث عن ارتباك، ورعشة، وتعرق.", "في حالة ارتفاع السكر، ابحث عن نعاس، وجفاف الفم، ورائحة نفس تشبه الفاكهة."],
        "criticalSymptoms": ["عدم استجابة أو فقدان للوعي.", "نوبات صرع.", "عدم القدرة على البلع.", "تنفس سريع وعميق (في حالة ارتفاع السكر)."],
        "firstAidMeasures": ["إذا كان مستوى السكر منخفضًا ويمكنه البلع، أعطه 15-20 جرامًا من السكر سريع المفعول (عصير، أقراص جلوكوز).", "انتظر 15 دقيقة؛ إذا لم يتحسن، كرر إعطاء السكر.", "إذا كان فاقدًا للوعي، لا تعطه طعامًا/شرابًا. اتصل بخدمات الطوارئ.", "إذا كان مستوى السكر مرتفعًا، ساعده على أخذ الأنسولين إذا كان يستطيع وشرب الماء."],
        "seekMedicalAssistance": ["اتصل بخدمات الطوارئ فورًا إذا كان الشخص فاقدًا للوعي، أو يعاني من نوبة صرع، أو لم يتحسن.", "يتطلب ارتفاع السكر الشديد تقييمًا طبيًا."],
        "disclaimer": "هذا دليل للإسعافات الأولية. اتبع خطة السكري الخاصة بالشخص واطلب المساعدة المتخصصة في حالات الطوارئ.",
        "source": "OFFLINE"
    },
    "شخص يعاني من نوبة صرع": {
        "situation": "شخص يعاني من نوبة صرع مع تشنجات أو تغير في الوعي.",
        "immediateAssessment": ["حافظ على هدوئك وقم بتوقيت النوبة.", "احمِ الشخص من الإصابة عن طريق إخلاء المنطقة المحيطة.", "ضع شيئًا ناعمًا تحت رأسه.", "أرخِ الملابس الضيقة حول الرقبة."],
        "criticalSymptoms": ["استمرار النوبة لأكثر من 5 دقائق.", "بدء نوبة ثانية بعد فترة وجيزة.", "صعوبة في التنفس أو تحول لونه إلى الأزرق.", "إصابة الشخص أو وجود حالة طبية معروفة لديه."],
        "firstAidMeasures": ["لا تحاول تثبيت الشخص.", "لا تضع أي شيء في فمه.", "بعد توقف التشنجات، ضعه على جانبه (وضع الإفاقة).", "ابق معه وتحدث بهدوء حتى يعود إلى وعيه بالكامل."],
        "seekMedicalAssistance": ["اتصل بخدمات الطوارئ في حالة وجود أي أعراض حرجة، أو إذا كانت هذه أول نوبة له، أو إذا حدثت في الماء.", "اتصل دائمًا لطلب المساعدة إذا لم تكن متأكدًا."],
        "disclaimer": "هذه المعلومات للإسعافات الأولية. تتطلب نوبات الصرع تشخيصًا وخطة إدارة طبية مناسبة.",
        "source": "OFFLINE"
    },
    "نزيف حاد من جرح": {
        "situation": "شخص يعاني من نزيف حاد أو غير مسيطر عليه من جرح.",
        "immediateAssessment": ["تأكد من سلامة المكان؛ ارتدِ قفازات إذا كانت متاحة.", "حدد مصدر النزيف.", "لا تقم بإزالة أي أجسام مغروسة."],
        "criticalSymptoms": ["تدفق الدم من الجرح.", "نزيف لا يتوقف بالضغط.", "علامات الصدمة (جلد شاحب وبارد، ضعف، دوار)."],
        "firstAidMeasures": ["اتصل بخدمات الطوارئ فورًا.", "اضغط بقوة ومباشرة بقطعة قماش نظيفة.", "ارفع الطرف المصاب فوق مستوى القلب إن أمكن.", "إذا تشبعت قطعة القماش بالدم، أضف المزيد فوقها؛ لا تقم بإزالة الأولى.", "استخدم عاصبة فقط إذا كنت مدربًا وكان ذلك ضروريًا لإصابة في طرف."],
        "seekMedicalAssistance": ["كل نزيف حاد وغير مسيطر عليه يتطلب عناية طبية طارئة فورية.", "اطلب المساعدة للجروح العميقة أو الجروح التي قد تحتاج إلى غرز."],
        "disclaimer": "هذا دليل للإسعافات الأولية. النزيف غير المسيطر عليه يهدد الحياة. أعطِ الأولوية للاتصال بطلب المساعدة الطارئة فورًا.",
        "source": "OFFLINE"
    }
  },
  ru: {
    "Человек с болью в груди и одышкой": {
      "situation": "Человек испытывает боль в груди и одышку, возможно, это сердечный приступ.",
      "immediateAssessment": ["Убедитесь, что место безопасно.", "Попросите человека сесть удобно.", "Ослабьте тесную одежду.", "Спросите, есть ли у него прописанные лекарства от боли в груди."],
      "criticalSymptoms": ["Боль, распространяющаяся на руки, спину, шею, челюсть или живот.", "Головокружение или обморок.", "Потливость, тошнота или рвота.", "Бледная или синюшная кожа."],
      "firstAidMeasures": ["Немедленно вызовите скорую помощь.", "Сохраняйте спокойствие человека.", "Если прописано, помогите ему принять одну таблетку аспирина для взрослых.", "Будьте готовы провести СЛР, если он потеряет сознание."],
      "seekMedicalAssistance": ["Немедленно обращайтесь в скорую при любой необъяснимой боли в груди.", "Не перевозите человека самостоятельно; дождитесь скорой помощи."],
      "disclaimer": "Это не замена профессиональной медицинской консультации. Боль в груди может быть признаком опасного для жизни состояния.",
      "source": "OFFLINE"
    },
    "Тяжелая аллергическая реакция (анафилаксия)": {
      "situation": "Человек испытывает тяжелую, угрожающую жизни аллергическую реакцию (анафилаксию).",
      "immediateAssessment": ["Проверьте наличие признаков тяжелой аллергической реакции (затрудненное дыхание, отек, сыпь).", "Спросите, есть ли у него известная аллергия и автоинъектор с эпинефрином.", "Помогите ему немедленно использовать автоинъектор."],
      "criticalSymptoms": ["Свистящее дыхание или неспособность говорить.", "Быстрый отек горла или языка.", "Чувство обреченности или тревоги.", "Спутанность сознания или потеря сознания."],
      "firstAidMeasures": ["Немедленно вызовите скорую помощь, даже если автоинъектор был использован.", "Помогите человеку лечь на спину; на бок, если его рвет.", "Держите его в тепле.", "Рассмотрите возможность введения второй дозы, если она доступна и симптомы не улучшаются через 5-15 минут."],
      "seekMedicalAssistance": ["Анафилаксия — это неотложная медицинская помощь. Всегда вызывайте помощь.", "Человек должен быть доставлен в больницу для наблюдения."],
      "disclaimer": "Это не замена профессиональной медицинской консультации. Всегда немедленно обращайтесь за медицинской помощью при анафилаксии.",
      "source": "OFFLINE"
    },
     "Человек падает в обморок или теряет сознание": {
        "situation": "Человек упал в обморок или временно потерял сознание.",
        "immediateAssessment": ["Проверьте реакцию и дыхание. Начните СЛР, если дыхания нет.", "Если дыхание есть, уложите его на спину и поднимите ноги.", "Ослабьте стесняющую одежду.", "Проверьте на наличие травм от падения."],
        "criticalSymptoms": ["Не приходит в себя в течение одной минуты.", "Испытывает боль в груди или сильную головную боль.", "Судорожная активность.", "Потеря контроля над мочевым пузырем или кишечником."],
        "firstAidMeasures": ["Обеспечьте свежий воздух.", "Не давайте еду или питье до полного восстановления сознания.", "Пусть он посидит 10-15 минут, прежде чем вставать.", "Обработайте любые травмы от падения."],
        "seekMedicalAssistance": ["Вызовите скорую помощь, если он не приходит в сознание быстро, имеет критические симптомы, беременен или имеет другие известные заболевания.", "Обратитесь за медицинской помощью даже при простом обмороке."],
        "disclaimer": "Эта информация предназначена для информационных целей. Обморок может быть признаком серьезного заболевания. Всегда консультируйтесь с медицинским работником.",
        "source": "OFFLINE"
    },
    "Диабетический криз (гипогликемия или гипергликемия)": {
        "situation": "Человек с диабетом испытывает неотложное состояние из-за очень низкого (гипогликемия) или очень высокого (гипергликемия) уровня сахара в крови.",
        "immediateAssessment": ["Если в сознании, спросите, есть ли у него диабет.", "При низком уровне сахара ищите спутанность сознания, дрожь, потливость.", "При высоком уровне сахара ищите сонливость, сухость во рту, фруктовый запах изо рта."],
        "criticalSymptoms": ["Отсутствие реакции или потеря сознания.", "Судороги.", "Неспособность глотать.", "Частое, глубокое дыхание (при высоком сахаре)."],
        "firstAidMeasures": ["При подозрении на низкий сахар и возможности глотать дайте 15-20 г быстродействующего сахара (сок, таблетки глюкозы).", "Подождите 15 минут; если не лучше, повторите.", "Если без сознания, НЕ давайте еду/питье. Вызовите скорую.", "При высоком сахаре помогите принять инсулин, если это возможно, и пить воду."],
        "seekMedicalAssistance": ["Немедленно вызовите скорую помощь, если человек без сознания, у него судороги или ему не становится лучше.", "Тяжелая гипергликемия требует медицинской оценки."],
        "disclaimer": "Это руководство по оказанию первой помощи. Следуйте индивидуальному плану лечения диабета и обращайтесь за профессиональной помощью в экстренной ситуации.",
        "source": "OFFLINE"
    },
    "У человека припадок": {
        "situation": "У человека припадок с судорогами или измененным сознанием.",
        "immediateAssessment": ["Сохраняйте спокойствие и засеките время припадка.", "Защитите человека от травм, убрав предметы вокруг.", "Подложите что-нибудь мягкое под голову.", "Ослабьте тесную одежду на шее."],
        "criticalSymptoms": ["Припадок длится более 5 минут.", "Вскоре начинается второй припадок.", "Затрудненное дыхание или посинение.", "Человек ранен или имеет известное заболевание."],
        "firstAidMeasures": ["НЕ удерживайте человека.", "НЕ кладите ничего в рот.", "После прекращения судорог поверните его на бок (восстановительное положение).", "Оставайтесь с ним и говорите спокойно, пока он полностью не придет в себя."],
        "seekMedicalAssistance": ["Вызовите скорую помощь при наличии критических симптомов, если это первый припадок или он произошел в воде.", "Всегда вызывайте помощь, если не уверены."],
        "disclaimer": "Эта информация для оказания первой помощи. Припадки требуют надлежащей медицинской диагностики и плана лечения.",
        "source": "OFFLINE"
    },
    "Сильное кровотечение из раны": {
        "situation": "У человека сильное или неконтролируемое кровотечение из раны.",
        "immediateAssessment": ["Обеспечьте безопасность места происшествия; наденьте перчатки, если есть.", "Определите источник кровотечения.", "Не извлекайте инородные предметы."],
        "criticalSymptoms": ["Кровь бьет фонтаном из раны.", "Кровотечение, которое не останавливается при давлении.", "Признаки шока (бледная, холодная кожа, слабость, головокружение)."],
        "firstAidMeasures": ["Немедленно вызовите скорую помощь.", "Наложите плотную, прямую повязку чистой тканью.", "Поднимите конечность выше уровня сердца, если это возможно.", "Если ткань пропиталась кровью, наложите еще слои сверху; не снимайте первый.", "Используйте жгут только в крайнем случае для травмы конечности, если вы обучены."],
        "seekMedicalAssistance": ["Любое сильное, неконтролируемое кровотечение требует немедленной скорой медицинской помощи.", "Обратитесь за помощью при глубоких ранах или ранах, требующих наложения швов."],
        "disclaimer": "Это руководство по оказанию первой помощи. Неконтролируемое кровотечение опасно для жизни. В первую очередь немедленно вызовите скорую помощь.",
        "source": "OFFLINE"
    }
  },
  zh: {
    "有人胸痛和呼吸急促": {
      "situation": "患者出现胸痛和呼吸急促，可能表示心脏事件。",
      "immediateAssessment": ["确保现场安全。", "请患者舒适地坐下。", "松开任何过紧的衣物。", "询问他们是否有治疗胸痛的处方药。"],
      "criticalSymptoms": ["疼痛蔓延至手臂、背部、颈部、下颚或胃部。", "头晕或昏厥。", "出汗、恶心或呕吐。", "皮肤苍白或发青。"],
      "firstAidMeasures": ["立即呼叫紧急服务。", "保持患者冷静。", "如果医生有开处方，帮助他们服用一片成人阿司匹林。", "如果他们失去知觉，准备进行心肺复苏。"],
      "seekMedicalAssistance": ["对于任何无法解释的胸痛，请立即联系紧急服务。", "不要自己运送患者；等待救护车。"],
      "disclaimer": "这不能替代专业的医疗建议。胸痛可能是危及生命的状况的标志。",
      "source": "OFFLINE"
    },
    "严重过敏反应（过敏性休克）": {
      "situation": "患者出现严重的、危及生命的过敏反应（过敏性休克）。",
      "immediateAssessment": ["检查严重过敏反应的迹象（呼吸困难、肿胀、皮疹）。", "询问他们是否有已知的过敏史并携带肾上腺素自动注射器。", "立即帮助他们使用自动注射器。"],
      "criticalSymptoms": ["喘息或无法说话。", "喉咙或舌头迅速肿胀。", "厄运感或焦虑感。", "意识模糊或丧失。"],
      "firstAidMeasures": ["即使已经使用了自动注射器，也应立即呼叫紧急服务。", "帮助患者仰卧；如果呕吐则侧卧。", "为他们保暖。", "如果症状在5-15分钟后没有改善，并且有第二剂可用，考虑使用。"],
      "seekMedicalAssistance": ["过敏性休克是医疗紧急情况。务必呼叫帮助。", "患者必须去医院观察。"],
      "disclaimer": "这不能替代专业的医疗建议。对于过敏性休克，请务必立即寻求医疗救助。",
      "source": "OFFLINE"
    },
     "有人昏厥或失去知觉": {
        "situation": "有人昏厥或暂时失去知觉。",
        "immediateAssessment": ["检查反应和呼吸。如果没有呼吸，开始心肺复苏。", "如果正在呼吸，让他们平躺并抬高双腿。", "松开紧身衣物。", "检查是否因跌倒而受伤。"],
        "criticalSymptoms": ["一分钟内没有醒来。", "出现胸痛或剧烈头痛。", "癫痫发作。", "大小便失禁。"],
        "firstAidMeasures": ["确保空气流通。", "在完全清醒前不要给予食物或饮料。", "让他们坐10-15分钟再站起来。", "处理因跌倒造成的任何伤害。"],
        "seekMedicalAssistance": ["如果他们没有迅速恢复意识、有危急症状、怀孕或有其他已知疾病，请呼叫紧急服务。", "即使是简单的昏厥也应寻求医疗建议。"],
        "disclaimer": "本指南仅供参考。昏厥可能是严重医疗状况的迹象。请务必咨询医疗专业人员。",
        "source": "OFFLINE"
    },
    "糖尿病急症（低血糖或高血糖）": {
        "situation": "糖尿病患者因血糖过低（低血糖）或过高（高血糖）而出现紧急情况。",
        "immediateAssessment": ["如果清醒，询问他们是否有糖尿病。", "对于低血糖，寻找意识模糊、颤抖、出汗的迹象。", "对于高血糖，寻找嗜睡、口干、呼吸有水果味的迹象。"],
        "criticalSymptoms": ["无反应或失去知觉。", "癫痫发作。", "无法吞咽。", "呼吸急促深重（针对高血糖）。"],
        "firstAidMeasures": ["如果怀疑是低血糖且能够吞咽，给予15-20克速效糖（果汁、葡萄糖片）。", "等待15分钟；如果没有好转，重复给予糖分。", "如果失去知觉，不要给予食物/饮料。呼叫紧急服务。", "如果是高血糖，如果他们能自己操作，帮助他们注射胰岛素并喝水。"],
        "seekMedicalAssistance": ["如果患者失去知觉、癫痫发作或情况没有改善，请立即呼叫紧急服务。", "严重的高血糖需要医疗评估。"],
        "disclaimer": "这是急救指南。请遵循患者特定的糖尿病计划，并在紧急情况下寻求专业帮助。",
        "source": "OFFLINE"
    },
    "有人癫痫发作": {
        "situation": "有人正在癫痫发作，伴有抽搐或意识改变。",
        "immediateAssessment": ["保持冷静并记录发作时间。", "清理周围区域，保护患者免受伤害。", "在他们头下垫上柔软的东西。", "松开颈部周围的紧身衣物。"],
        "criticalSymptoms": ["癫痫发作持续超过5分钟。", "第二次发作紧接着开始。", "呼吸困难或脸色发青。", "患者受伤或有已知的医疗状况。"],
        "firstAidMeasures": ["不要按住患者。", "不要在他们嘴里放任何东西。", "抽搐停止后，将他们翻转到侧卧位（恢复姿势）。", "陪伴在他们身边，并用平静的语气与他们交谈，直到他们完全清醒。"],
        "seekMedicalAssistance": ["如果出现任何危急症状、这是他们第一次发作或在水中发作，请呼叫紧急服务。", "如果不确定，请务必寻求帮助。"],
        "disclaimer": "此信息用于急救。癫痫发作需要适当的医疗诊断和管理计划。",
        "source": "OFFLINE"
    },
    "伤口大量出血": {
        "situation": "有人因伤口大量或失控出血。",
        "immediateAssessment": ["确保现场安全；如果可能，戴上手套。", "找出出血源。", "不要移除任何嵌入的物体。"],
        "criticalSymptoms": ["血液从伤口喷出。", "按压后仍无法止血。", "出现休克迹象（皮肤苍白、冰冷、虚弱、头晕）。"],
        "firstAidMeasures": ["立即呼叫紧急服务。", "用干净的布直接用力按压。", "如果可能，将受伤的肢体抬高到心脏以上。", "如果血液浸透了布，在上面再加一块；不要移开第一块。", "仅在受过培训且对肢体伤害必要时才使用止血带。"],
        "seekMedicalAssistance": ["所有严重、失控的出血都需要立即的紧急医疗救助。", "对于深层伤口或可能需要缝合的伤口，请寻求帮助。"],
        "disclaimer": "这是急救指南。失控的出血是危及生命的。请优先立即呼叫紧急帮助。",
        "source": "OFFLINE"
    }
  },
};

export const getOfflineGuidance = (prompt: string, lang: string): Guidance | null => {
  const langData = offlineEmergencies[lang];
  if (langData && langData[prompt]) {
    return langData[prompt];
  }
  // Fallback to English if not found in the specified language
  const enData = offlineEmergencies['en'];
  return enData[prompt] || null;
};