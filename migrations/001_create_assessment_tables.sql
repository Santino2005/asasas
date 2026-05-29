-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Card responses table
CREATE TABLE IF NOT EXISTS card_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id VARCHAR(255) NOT NULL,
  card_text TEXT,
  selected BOOLEAN NOT NULL,
  card_group INTEGER,
  card_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spatial responses table
CREATE TABLE IF NOT EXISTS spatial_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id VARCHAR(255) NOT NULL,
  question_title TEXT,
  selected_corner VARCHAR(255),
  corner_label VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refinement responses table
CREATE TABLE IF NOT EXISTS refinement_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ranking_order INTEGER NOT NULL,
  card_id VARCHAR(255) NOT NULL,
  card_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_cards_selected INTEGER,
  total_spatial_responses INTEGER,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_card_responses_user_id ON card_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_spatial_responses_user_id ON spatial_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_refinement_responses_user_id ON refinement_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
