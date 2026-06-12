import { Database, Link2, Key, HelpCircle, Columns } from "lucide-react";

export default function DatabaseERD() {
  
  const tables = [
    {
      name: "Students",
      description: "Student identity data and global gamified progress state.",
      fields: [
        { name: "id", type: "UUID [PK]", isKey: true, desc: "Unique student ID" },
        { name: "name", type: "varchar", isKey: false, desc: "Full user name" },
        { name: "email", type: "varchar [UNIQUE]", isKey: false, desc: "Email address" },
        { name: "xp", type: "integer", isKey: false, desc: "Cumulative XP points" },
        { name: "level", type: "integer", isKey: false, desc: "Calculated user level" },
        { name: "streak", type: "integer", isKey: false, desc: "Active streak counter (days)" }
      ]
    },
    {
      name: "Tracks",
      description: "Specialized master curriculum paths.",
      fields: [
        { name: "id", type: "varchar [PK]", isKey: true, desc: "Physical syllabus ID" },
        { name: "title", type: "varchar", isKey: false, desc: "Pathway display heading" },
        { name: "description", type: "text", isKey: false, desc: "Objective goals disclosure" },
        { name: "difficulty", type: "varchar", isKey: false, desc: "Beginner, Intermediate, Advanced" },
        { name: "xp_reward", type: "integer", isKey: false, desc: "Pathway completion reward" }
      ]
    },
    {
      name: "Modules",
      description: "Progressive sectors in a track (connected nodes).",
      fields: [
        { name: "id", type: "varchar [PK]", isKey: true, desc: "Unique module identifier" },
        { name: "track_id", type: "varchar [FK -> Tracks.id]", isKey: true, desc: "Links to owner syllabus" },
        { name: "title", type: "varchar", isKey: false, desc: "Sector heading node" },
        { name: "order", type: "integer", isKey: false, desc: "Trajectory chronological index" },
        { name: "xp_reward", type: "integer", isKey: false, desc: "Evaluation XP reward" }
      ]
    },
    {
      name: "MicroLessons",
      description: "Granular educational concept slides.",
      fields: [
        { name: "id", type: "varchar [PK]", isKey: true, desc: "Granular concept ID" },
        { name: "module_id", type: "varchar [FK -> Modules.id]", isKey: true, desc: "Links to owner sector" },
        { name: "title", type: "varchar", isKey: false, desc: "Concept slide heading" },
        { name: "content", type: "text", isKey: false, desc: "Full text content slide representation" },
        { name: "xp_reward", type: "integer", isKey: false, desc: "Slide acclimate completion bonus" }
      ]
    },
    {
      name: "Progress",
      description: "Active persistence logger for individual students.",
      fields: [
        { name: "id", type: "UUID [PK]", isKey: true, desc: "Transaction ID" },
        { name: "student_id", type: "UUID [FK -> Students.id]", isKey: true, desc: "Target student pointer" },
        { name: "track_id", type: "varchar [FK -> Tracks.id]", isKey: true, desc: "Current selected curriculum" },
        { name: "completed_lessons", type: "text[]", isKey: false, desc: "Array of completed lessons IDs" },
        { name: "completed_modules", type: "text[]", isKey: false, desc: "Array of passed module IDs" },
        { name: "last_active", type: "timestamp", isKey: false, desc: "Session timestamp coordinates" }
      ]
    },
    {
      name: "QuizResults",
      description: "Logs of student module quiz scores.",
      fields: [
        { name: "id", type: "UUID [PK]", isKey: true, desc: "UUID evaluation event" },
        { name: "student_id", type: "UUID [FK -> Students.id]", isKey: true, desc: "Student pointer" },
        { name: "module_id", type: "varchar [FK -> Modules.id]", isKey: true, desc: "Module sector verified" },
        { name: "score", type: "integer", isKey: false, desc: "Accuracy percentage (0 - 100)" },
        { name: "xp_awarded", type: "integer", isKey: false, desc: "XP secured" },
        { name: "timestamp", type: "timestamp", isKey: false, desc: "Submission date and clock" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight font-display flex items-center gap-2">
            Schema Entity-Relationship Model (ERD)
            <span className="text-xs text-cyan-400 font-mono bg-cyan-900/20 px-2 py-0.5 rounded border border-cyan-400/20">POSTGRESQL RELATIONAL DESIGN</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Structural blueprint mapping the durable storage nodes, foreign-key pointers, and data fields behind LearnScape.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        
        {tables.map((table) => {
          return (
            <div 
              key={table.name} 
              className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4 hover:border-violet-500/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Table Header block */}
                <div className="flex justify-between items-start border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-white font-mono text-sm uppercase">{table.name}</h3>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">TABLE_SCHEMA</span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed py-2 font-sans">
                  {table.description}
                </p>

                {/* Fields list */}
                <div className="space-y-2 pt-2">
                  <div className="flex font-mono text-[9px] uppercase tracking-wider text-gray-600 border-b border-slate-900/40 pb-1">
                    <span className="w-1/3">Field Name</span>
                    <span className="w-1/3 text-center">Type</span>
                    <span className="w-1/3 text-right">Reference</span>
                  </div>

                  {table.fields.map((field) => (
                    <div key={field.name} className="flex items-start text-xs font-mono py-1 border-b border-slate-900/30">
                      
                      {/* Name */}
                      <span className="w-1/3 text-slate-300 font-semibold truncate flex items-center gap-1">
                        {field.isKey && <Key className="w-3 h-3 text-amber-500 flex-shrink-0" />}
                        <span>{field.name}</span>
                      </span>

                      {/* Type */}
                      <span className={`w-1/3 text-center text-[10px] truncate ${
                        field.type.includes("PK") ? "text-amber-400 font-bold" :
                        field.type.includes("FK") ? "text-cyan-400 font-bold" :
                        "text-slate-500"
                      }`}>
                        {field.type}
                      </span>

                      {/* Description / Refs notes */}
                      <span className="w-1/3 text-right text-[10px] text-slate-400 truncate hover:text-white transition-colors" title={field.desc}>
                        {field.desc}
                      </span>

                    </div>
                  ))}
                </div>
              </div>

              {/* Table relationships tags footer */}
              <div className="pt-3 border-t border-slate-900/80 flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <Link2 className="w-3.5 h-3.5 text-violet-400" />
                <span>
                  {table.name === "Students" ? "Referenced by Progress, QuizResults" :
                   table.name === "Tracks" ? "One-to-Many on Modules, Progress" :
                   table.name === "Modules" ? "Belongs to Track; One-to-Many lessons" :
                   table.name === "MicroLessons" ? "Belongs to Module" :
                   table.name === "Progress" ? "Belongs to Student; References Track" :
                   "Belongs to Student; References Module"}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Database relationships notes */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 text-xs font-mono text-gray-500 space-y-4">
        <div className="flex items-center gap-1.5 text-white uppercase font-bold">
          <Columns className="w-4 h-4 text-cyan-400" />
          <span>Referential Constraints Map</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 leading-relaxed">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
            <div className="text-cyan-400">Students → Progress Association</div>
            <p className="text-[11px] text-gray-500">
              Foreign Key: <code className="text-gray-400">Progress.student_id</code> refers to <code className="text-gray-400">Students.id</code>. Enforces that each progress track record resolves back to a valid registered Cadet signature.
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-900 space-y-1">
            <div className="text-violet-400">Modules → MicroLessons Cascade</div>
            <p className="text-[11px] text-gray-500">
              Foreign Key: <code className="text-gray-400">MicroLessons.module_id</code> refers to <code className="text-gray-400">Modules.id</code> on DELETE CASCADE. Enforces syllabus integrity across the curriculum trees.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
