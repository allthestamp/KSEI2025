import QualificationSelector from './QualificationSelector';
import StampMakingOptions from '../stamp-making/ApplicationOptions';
import HandwritingOptions from '../handwriting/ApplicationOptions';

export default function ApplicationQualificationFields({ t, qualification, onQualificationChange, formData, setFormData, errors }) {
  const Options = qualification === 'handwriting' ? HandwritingOptions : StampMakingOptions;
  return <div className="space-y-6">
    <QualificationSelector t={t} value={qualification} onChange={onQualificationChange}/>
    <Options t={t} formData={formData} setFormData={setFormData} errors={errors}/>
  </div>;
}
