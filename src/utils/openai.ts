import OpenAI from 'openai';

let openaiApiKey: string | null = localStorage.getItem('openai_api_key');

export const setOpenAiApiKey = (key: string) => {
  openaiApiKey = key;
  localStorage.setItem('openai_api_key', key);
};

export const getOpenAiApiKey = () => {
  if (!openaiApiKey) {
    throw new Error("Aucune clé API OpenAI n'est configurée.");
  }
  return openaiApiKey;
};

export const clearOpenAiApiKey = () => {
  openaiApiKey = null;
  localStorage.removeItem('openai_api_key');
};

export const validateOpenAiApiKey = async (key: string): Promise<boolean> => {
  try {
    const openai = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true
    });

    await openai.models.list();
    return true;
  } catch (error) {
    console.error('Erreur de validation de la clé API:', error);
    return false;
  }
};

export const sendMessageToOpenAI = async (
  userId: string,
  robotName: string,
  instructions: string,
  temperature: number,
  message: string
): Promise<string> => {
  try {
    const apiKey = getOpenAiApiKey();
    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Vous êtes un robot nommé ${robotName}. Instructions : ${instructions}`
        },
        { role: 'user', content: message }
      ],
      temperature
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('Réponse invalide de OpenAI');
    }

    return response;
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Clé API OpenAI invalide. Veuillez contacter l\'administrateur.');
      }
      if (error.message.includes('Rate limit')) {
        throw new Error('Limite de requêtes OpenAI atteinte. Veuillez réessayer plus tard.');
      }
      throw new Error(`Erreur: ${error.message}`);
    }
    
    throw new Error('Une erreur est survenue lors de la communication avec OpenAI');
  }
};